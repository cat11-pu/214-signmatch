// match.js：一致性（基线：一律给空表）
import { signOf } from "./sign.js";

export function matchSigns(left, right) {
  return { marks: [], same: 0, diff: 0, zero: 0 };
}
