
var bookmarkNameInput = document.getElementById(`bookmarkName`);
var bookmarkLinkInput = document.getElementById(`bookmarkLink`);
var submitInput = document.getElementById(`submit`);
var tableContentInput = document.getElementById(`tableContent`);


var  urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
var nameRegex =/^[a-z0-9_-]{3,15}$/;

var bookmarkContainer =[];
if(localStorage.getItem(`setBookmark`) !== null)
{
	bookmarkContainer = JSON.parse(localStorage.getItem(`setBookmark`)) ;
  
    for (var y = 0; y < bookmarkContainer.length; y++) 
	{
		displayBookMark(y);	
	}
}



function submitBtn()
{
	var bookmark=
	{
		code : bookmarkNameInput.value,
		link : bookmarkLinkInput.value
	}		
	bookmarkContainer.push(bookmark);
	
	displayBookMark(bookmarkContainer)
	localStorage.setItem(`setBookmark` , JSON.stringify(bookmarkContainer));
	clearForm();
}

 function vistBookMark(bookmarkIndex)
{
	var bookmarkURL = bookmarkContainer[bookmarkIndex].link;
	var httpsRegex = /^(https?:\/\/)/;

	if (!httpsRegex.test(bookmarkURL)) {
		
		bookmarkURL = "https://" + bookmarkURL;
	  }
	  
	
	  window.open(bookmarkURL, '_blank');

} 

function deleteBookMark(deleteBookMarkIndex)
{
	bookmarkContainer.splice(deleteBookMarkIndex,1);

	displayBookMark(bookmarkContainer)
	localStorage.setItem(`setBookmark` , JSON.stringify(bookmarkContainer));
}


function clearForm()
{
	bookmarkNameInput.value = null;
	bookmarkLinkInput.value = null;
}

function displayBookMark(arryOfDisplayBookMark)
{
    var clear =``;

	for (var i=0; i< arryOfDisplayBookMark.length; i++)
    {
		clear += `
		   <tr>
                <td>${i +1}</td>
                <td>${arryOfDisplayBookMark[i].code}</td>              
                <td>
                  <button onclick="vistBookMark(${i})" class="btn btn-warning pe-2" >
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button onclick="deleteBookMark(${i})" class=" btn btn-danger pe-2">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
		`;
	}
	document.getElementById(`tableContent`).innerHTML = clear;
}


var code = bookmarkNameInput.value;
var link = bookmarkLinkInput.value;

function isValidBookmarkURL(bookmarkURL)
 {
	var httpsRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?/;
	if (!httpsRegex.test(bookmarkURL))
    {
	  bookmarkURL = "https://" + bookmarkURL;
	}
	return bookmarkURL;
  }
  

function validateURL(url)
  {
	return urlRegex.test(url);
  }

  function validateName(code)
  {
	return nameRegex.test(code);
  }

  var errors = [];

  if
   (!validateName(code))
  {
    errors.push('Invalid name, it should be between 3 to 15 characters.');

  }

  if (!validateURL(link))
   {
	errors.push('Invalid URL. Please ensure the URL is correct.');

  }














