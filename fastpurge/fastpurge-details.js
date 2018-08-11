function loadDetails(purge_req_id, callback) {
  chrome.storage.local.get(null, function(data) {
    var arr_history = [];
    var history_data = {};

    for (var key in data) {
      if (key.startsWith("H_")) {
        arr_history.push(data[key]);
      }
    }

    for(var j=0; j < arr_history.length; j++) {
      if (arr_history[j].requestId == purge_req_id) {
        history_data = arr_history[j];
      }
    }

    var html = '<tr class="shown">';
    html += '<td colspan="10">';
    html += '<table class="history-table">';
    
    var better_title = {
      lastupdated: "Last Updated",
      network: "Network",
      purgeId: "Purge Id",
      purge_objects: "Purge Objects",
      purge_request_accepted: "Purge Request Status",
      purge_type: "Purge Type",
      raw_response: "Raw Response",
      requestId: "Request Id",
      requestedTime: "Request Time",
      token_used: "Credential Used",
      update_type: "Purge Update Type"
    }

    var arr_keys = Object.keys(history_data).reverse();

    for(var i=0; i < arr_keys.length; i++) {
      let key = arr_keys[i];
      var text = "";
      if (jQuery.type(history_data[key]) == 'object' && key != 'token_used') {
        text = "<pre>" + JSON.stringify(history_data[key], null, 2) + "</pre>";
      } else if (jQuery.type(history_data[key]) == 'array') {
        for(var k=0; k < history_data[key].length; k++) {
          text += "<p>" + history_data[key][k] + "</p>";
        }
      } else if (key == 'token_used') {
        text = history_data[key].desc;
      } else {
        text = history_data[key];
      }
      html += "<tr><td><b>" + better_title[key] + "</b></td><td>" + text + "</td></tr>";
    }
    html += '</table>';
    html += '</td>';
    html += '</tr>';

		callback(html);
	});
}

