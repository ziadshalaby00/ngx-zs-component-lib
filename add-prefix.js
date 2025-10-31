import fs from "fs";
import path from "path";

const PREFIX = "ngxzs:";

const exts = [".html", ".ts"];
const folder = "./src/app/ngx-zs-component";

// regex: يلتقط أي كلمة ضخمة (utility) يتبعها :prefixes* وتحتاج إضافة prefix
const regex = /(?<![\w-])(hover:|focus:|active:|disabled:|visited:|dark:|md:|lg:|xl:|2xl:|sm:|group-hover:|group-focus:|motion-safe:|motion-reduce:)?(\[[^\]]+\]|[a-z0-9.-/]+(?:\[[^\]]+\])?)/gi;

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (exts.includes(path.extname(file))) {
      processFile(full);
    }
  });
}

function processFile(file) {
  let data = fs.readFileSync(file, "utf8");

  // استبدال كل الكلاسات داخل class=""
  data = data.replace(/class="([^"]+)"/g, (match, classes) => {
    const newClasses = classes
      .split(/\s+/)
      .map((cls) => {
        if (cls.startsWith(PREFIX)) return cls; // لو فيه prefix مسبقًا
        if (!cls.trim()) return cls;

        return PREFIX + cls;
      })
      .join(" ");

    return `class="${newClasses}"`;
  });

  // استبدال الكلاسات داخل strings في TS
  data = data.replace(/`([^`]+)`/g, (match, content) => {
    const newContent = content
      .split(/\s+/)
      .map((cls) => {
        if (cls.startsWith(PREFIX)) return cls;
        if (!cls.trim()) return cls;
        return PREFIX + cls;
      })
      .join(" ");

    return "`" + newContent + "`";
  });

  fs.writeFileSync(file, data, "utf8");
  console.log("✅ Updated:", file);
}

walk(folder);