// sign.js：判符号
export function signOf(value) {
  if (value > 0) return "pos";
  if (value < 0) return "neg";
  return "zero";
}
