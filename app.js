// app.js：渲染结果
import { signOf } from "./sign.js";
import { matchSigns } from "./match.js";

export function render(spec) {
  const left = spec.left || [];
  const right = spec.right || [];
  const view = matchSigns(left, right);
  const marks = view.marks || [];
  return { marks: marks, same: view.same || 0, diff: view.diff || 0, zero: view.zero || 0,
           count: marks.length, left_count: left.length, right_count: right.length,
           total_ok: (view.same || 0) + (view.diff || 0) + (view.zero || 0) === marks.length,
           first_sign: left.length > 0 ? signOf(left[0]) : "zero" };
}
