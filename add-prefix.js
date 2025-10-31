import fs from "fs";
import path from "path";

const PREFIX = "zs:";

const exts = [".html", ".ts"];
const folder = "./src/app/ngx-zs-component";

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

  // ✅ معالجة class=""
  data = data.replace(/class="([^"]+)"/g, (match, classes) => {
    const newClasses = classes
      .split(/\s+/)
      .map((cls) => {
        if (!cls.trim()) return cls;

        // ✅ لا تلمس كلاسات FontAwesome
        if (cls.startsWith("fa")) return cls;

        // ✅ لو فيه prefix مسبقًا
        if (cls.startsWith(PREFIX)) return cls;

        return PREFIX + cls;
      })
      .join(" ");

    return `class="${newClasses}"`;
  });

  // ✅ معالجة Strings داخل الـ TS
  data = data.replace(/`([^`]+)`/g, (match, content) => {
    const newContent = content
      .split(/\s+/)
      .map((cls) => {
        if (!cls.trim()) return cls;

        // ✅ تجاهل FontAwesome
        if (cls.startsWith("fa")) return cls;

        if (cls.startsWith(PREFIX)) return cls;

        return PREFIX + cls;
      })
      .join(" ");

    return "`" + newContent + "`";
  });

  fs.writeFileSync(file, data, "utf8");
  console.log("✅ Updated:", file);
}

walk(folder);
