import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストにタスクを追加する関数
const createIncompleteList = (text) => {
  //li生成
  const li = document.createElement("li");
  li.className = "task-name";

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  //p
  const p = document.createElement("p");
  p.innerText = text;

  //button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ（li）を未完了リストから削除;
    deleteFromIncompleteList(deleteButton.closest(".task-name"));
  });

  //button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  console.log(completeButton);
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ(li）を未完了リストから削除し、完了したTODO側へ追加（ボタンは戻す）する。
    deleteFromIncompleteList(completeButton.closest(".task-name"));

    // 完了リストに追加する要素
    const addTarget = completeButton.closest(".task-name");

    // TODO内容テキストを取得
    const text = addTarget.firstElementChild.firstElementChild.innerText;

    // li以下を初期化(div)
    addTarget.textContent = null;
    console.log(addTarget);

    // pタグ生成
    const p = document.createElement("p");
    p.innerText = text;

    // liタグの子要素に各要素を設定
    const div = document.createElement("div");
    div.className = "list-row";
    div.appendChild(p);
    div.appendChild(backButton);
    addTarget.appendChild(div);
    console.log(addTarget);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //divタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

//button(戻す)タグ生成
const backButton = document.createElement("button");
backButton.innerText = "戻す";

// 押された戻すボタンの親タグ(li)を完了リストから削除
backButton.addEventListener("click", () => {
  const deleteTarget = backButton.closest(".task-name");
  document.getElementById("complete-list").removeChild(deleteTarget);

  //テキスト取得
  const text = backButton.parentNode.firstElementChild.innerText;
  createIncompleteList(text);
});

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
