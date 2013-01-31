//author: Blair Vanderhoof
//https://github.com/blairvanderhoof/gist-embed
$(function(){
  var gistMarkerId = 'gist-';

  //find all code elements containing "gist-" the id attribute.
  $('code[id*="'+gistMarkerId+'"]').each(function(){
    var $elem = $(this),
      id,
      url,
      file,
      line,
      data = {};

    id = $elem.attr('id') || '';
    file = $elem.attr('data-file');
    line = $elem.attr('data-line');
    splittedFileName = file.split('.').join('-');
    
    if(file){
      data.file = file;
    }

    //if the id doesn't begin with 'gist-', then ignore the code block
    if (!id || id.indexOf('gist-') !== 0) return false;

    //make block level so loading text shows properly
    $elem.css('display', 'block');
    
    //get the numeric id from the id attribute of the element holder
    id = id.substr(0, gistMarkerId.length) === gistMarkerId ? id.replace(gistMarkerId, '') : null;

    //make sure result is a numeric id
    if(!isNaN(parseInt(id, 10))){
      url = 'https://gist.github.com/' + id + '.json';
      //loading
      $elem.html('Loading gist ' + url + (data.file ? ', file: ' + data.file : '') + '...');
      //request the json version of this gist
      $.ajax({
        url: url,
        data: data,
        dataType: 'jsonp',
        timeout: 10000,
        success: function(response){
          //the html payload is in the div property
          if(response && response.div){
            //add the stylesheet if it does not exist
            if(response.stylesheet && $('link[href="' + response.stylesheet + '"]').length === 0){
              var l = document.createElement("link"),
                head = document.getElementsByTagName("head")[0];

              l.type = "text/css";
              l.rel = "stylesheet";
              l.href = response.stylesheet;
              head.insertBefore(l, head.firstChild);
            }
            if(line){
              lineCode = $(response.div).find('#file-' + splittedFileName + '-LC' + line)[0].html();
              basicStructureWithSingleLine = '<div id="gist' + id + '" class="gist"><div class="gist-file">' +
                                             '<div class="gist-data gist-syntax"><div class="file-data">' +
                                             '<table cellpadding="0" cellspacing="0" class="lines highlight">' +
                                             '<tbody><tr><td class="line-data"><pre class="line-pre">' +
                                             '<div class="line" id="file-' + splittedFileName + '-LC' + line + '">' +
                                             lineCode + '</div></pre></td></tr></tbody></table></div></div></div></div>';
              $elem.html(basicStructureWithSingleLine);
            }
            else{
              $elem.html(response.div);
            }
          }else{
            $elem.html('Failed loading gist ' + url);
          }
        },
        error: function(){
          $elem.html('Failed loading gist ' + url);
        }
      });
    }else{
      $elem.html('Failed loading gist with incorrect id format: ' + $elem.attr('id'));
    }
  });
});
