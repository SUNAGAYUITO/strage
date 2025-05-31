$(document).ready(function () {
  let selectedRating = 0;

  // 星の評価
  $('#star-rating .star').on('click', function () {
    selectedRating = $(this).data('value');
    $('#star-rating .star').each(function () {
      $(this).toggleClass('selected', $(this).data('value') <= selectedRating);
    });
  });

  // 保存ボタンどす
  $("#save").on("click", function () {
    const key = $("#key").val();
    const memo = $("#memo").val();


    // メモと評価を連結して保存してく！
    const combinedValue = selectedRating + ":::" + memo;
    localStorage.setItem(key, combinedValue);

    const html = `<div class="memo-block border-b border-gray-300 py-2">
        <h3 class="text-lg font-bold">${key}</h3>
        <p>評価: ${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</p>
        <p class="text-sm">${memo}</p>
      </div>`;
    $("#list").append(html);
  });

  
  // リセット
  $("#clear").on("click", function () {
    localStorage.clear();
    $("#list").empty();
  });

  // ページ読み込み時：保存データを表示
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const combinedValue = localStorage.getItem(key);
    const parts = combinedValue.split(":::");
    const rating = parseInt(parts[0]);
    const memo = parts[1];

    const html = `<div class="memo-block border-b border-gray-300 py-2">
        <h3 class="text-lg font-bold">${key}</h3>
        <p>評価: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
        <p class="text-sm">${memo}</p>
      </div>`;
    $("#list").append(html);
  }
});
