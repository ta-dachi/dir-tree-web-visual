import dirTree from "directory-tree";
import fs from "fs";

// const tree = dirTree(`C:\\Users\\tadachi\\Desktop\\smash_switch_ost`);
const tree = dirTree(`\\\\10.0.0.12\\Committed01\\_Anime Archived`);

/**
 * Format bytes into a human readable count. It rounds up to a larger size.
 *
 * @param {*} bytes
 * @param {*} decimals
 */
function formatBytes(bytes, decimals) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals <= 0 ? 0 : decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

fs.writeFileSync("./data.json", JSON.stringify(tree, null, 2), "utf-8");

console.log("test");
console.log(formatBytes(tree.size, 1));
console.log(tree);
