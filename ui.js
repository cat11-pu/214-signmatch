// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "左列 " + (spec.left || []).length + " 项，右列 " + (spec.right || []).length + " 项。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.marks.forEach(function (mark, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spec.left || [])[spot] + " 对 " + (spec.right || [])[spot];
      row.appendChild(head);
      const chip = document.createElement("span");
      chip.className = "chip" + (mark === "same" ? " ok" : (mark === "diff" ? " bad" : ""));
      chip.textContent = mark === "same" ? "同号" : (mark === "diff" ? "异号" : "含零");
      row.appendChild(chip);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "同号 " + view.same + " 项，异号 " + view.diff + " 项，含零 " + view.zero;
    parts.log.textContent = "项数 " + view.count;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "查符号一致性";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "右列加一项";
  addButton.addEventListener("click", function () {
    spec.right = (spec.right || []).concat([-4]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "右列去一项";
  dropButton.addEventListener("click", function () {
    spec.right = (spec.right || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个右列值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "5";
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) {
      try {
        const view = render(Object.assign({}, spec, { right: (spec.right || []).map(() => parsed) }));
        parts.out.textContent = "右列全用 " + parsed + "：同号 " + view.same + "，异号 " + view.diff + "，含零 " + view.zero;
      } catch (error) {
        parts.out.textContent = String(error && error.code ? error.code : String(error));
      }
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看同号项数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "同号 " + view.same + " 项，共 " + view.count + " 项";
  });
  parts.controls.appendChild(readButton);

  draw();
}
