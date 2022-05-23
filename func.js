$(document).ready(function() {
  $("#php").click(function() {
    query = $("#req").val();
    t = query.split("\n");
    metho = t[0].split(" ")[0];
    endpoint = t[0].split(" ")[1];
    t.forEach(function(item, index) {
      if (item.startsWith("Host") || item.startsWith("host")) {
        host = item.split(" ")[1];
        url = "https://" + host + endpoint;
      }
    });
    head = t.slice(1, t.length - 1);
    head.forEach(function(it, ind) {
      if (it.startsWith("Content-Length") || it.startsWith("content-length")) {
        head.splice(ind, 1);
      }
    })
    head = arr_val(head);
    h = '';
    head.forEach(function(i, id) {
      h = h + '"' + i + '",';
    })
    if (metho === "POST" || metho === "PUT") {
      data = t.pop();
      $("#code").text("$u = '" + url + "';\n$h = [" + h + "];\n$d = '" + data + "';\n$res = http($u,$h,'" + metho + "',$d);");
    } else $("#code").text("$u = '" + url + "';\n$h = [" + h + "];\n$res = http($u,$h,'" + metho + "');");
  });
});

function arr_val(arrayObj) {
  tempObj = {};
  Object.keys(arrayObj).forEach((prop) => {
    if (arrayObj[prop]) {
      tempObj[prop] = arrayObj[prop];
    }
  });
  return Object.values(tempObj);
}
