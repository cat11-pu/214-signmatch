// match.js：一致性（基线：一律给空表）
import { signOf } from "./sign.js";

export function matchSigns(left, right) {
  if (left.length !== right.length) {
    const error = new Error("两列长度不一致");
    error.code = "E_BAD_COLUMN";
    throw error;
  }
  const marks = new Array(left.length);
  let same = 0;
  let diff = 0;
  let zero = 0;
  for (let i = 0; i < left.length; i += 1) {
    const ls = signOf(left[i]);
    const rs = signOf(right[i]);
    let mark;
    if (ls === "zero" || rs === "zero") {
      mark = "zero";
      zero += 1;
    } else if (ls === rs) {
      mark = "same";
      same += 1;
    } else {
      mark = "diff";
      diff += 1;
    }
    marks[i] = mark;
  }
  return { marks: marks, same: same, diff: diff, zero: zero };
}
