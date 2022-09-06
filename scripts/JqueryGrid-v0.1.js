

//Declaring Global Variable to store the data by parameters

var $GridDivID = "";

var $PagingDivID = "";

var $EditDivID = "";

var $SearchDropDownID = "";

var $SearchTextID = "";

var $PageSize = 0;

var $LabelMsgID = "";

var $EmptyMessage = "";

var $DeleteMessage = "";

var $PrimaryKey = "";

var $ColumnWidths = [];

var $TextAlignMents = [];

var $DeleteMethod = [];

var $HeaderNames = [];

var $DataFields = [];

var $SortingFields = [];

var $linktypes = [];

var $linkPositions = [];

var $LinkSource = [];

var $OrginalData = [];

var $ResponseData = [];

var $ExtralinkMethods = [];

var $TotalPages = 0;

var $IsSearchedData = false;

var $TotalRecords = 0;

var $DefaultPageCount = 0;

var $EditLink = [];

var $CurrentPage = 0;

var $pagecount = 0;

var $bool = false;

var $CheckboxFields = [];

var $DispalyValueforNullFeilds = "";

var $DeleteLink = [];

var $RefreshButtonID = "";

var $SearchButtonID = "";

var $OrderBy = [];
var $defaultOrderBy = "";

var $linktooltips = [];

var $selectedvalue = 0;

var $EditIndex = -1;
$startrecordnum = 0;
$endrecordnum = 0;



//End of Declaring Global Variable to store the data by parameters


//Method is used to create JqueryGrid and We give to user this method to Use our Plugin 
///Name is important.please do not change the method name which reflects all the pages of users
///All The Parametrs are required
///All are in given format and do not change the order of parameter also

function JqGrid(GridDivID, PagingDivID, EditDivID, SearchDropDownID, SearchTextID,
    LabelMsgID, SearchButtonID, RefreshButtonID, HeaderNames, DataFields, SortingFields, ColumnWidths, TextAlignMents,
    PrimaryKey, EditLink, DeleteLink, linktypes, linktooltips, LinkSource, ExtralinkMethods, linkPositions, EmptyMessage, DeleteMessage, ResponseData,
    RecordsPerPage, DeleteMethod, CheckboxFields, DispalyValueforNullFeilds, OrderBy) {

    try {
       
        //Clear The Divs before binding The Data

        $('#' + GridDivID + '').empty();
        $('#' + PagingDivID + '').empty();
        $('#' + LabelMsgID + '').empty();

        //End Clear The Divs before binding The Data

        //Checking The data length

        if (ResponseData.length <= 0) {

            $("#" + GridDivID + "").append("<div class='norecords'><span>" + EmptyMessage + "</span></div>");
            $("#" + PagingDivID + "").append("<div class='Records'>Total Records:0 </div>");

            return; //If Data is null the programme returns back from script
        }

        //End of Checking The data length 

        //Assigining All parameters to global variables to store the data

        $ColumnWidths = ColumnWidths;

        $DataFields = DataFields;

        $DeleteMessage = DeleteMessage;

        $DeleteMethod = DeleteMethod;

        $EditDivID = EditDivID;

        $EmptyMessage = EmptyMessage;

        $ExtralinkMethods = ExtralinkMethods;

        $GridDivID = GridDivID;

        $HeaderNames = HeaderNames;

        $LabelMsgID = LabelMsgID;

        $LinkSource = LinkSource;

        $linktypes = linktypes;

        $linkPositions = linkPositions;

        $PagingDivID = PagingDivID;

        $PrimaryKey = PrimaryKey;

        $PageSize = new Number(RecordsPerPage);

        $ResponseData = ResponseData;

        $SearchDropDownID = SearchDropDownID;

        $SearchTextID = SearchTextID;

        $SortingFields = SortingFields;

        $TextAlignMents = TextAlignMents;

        $TotalRecords = ResponseData.length;

        $DefaultPageCount = RecordsPerPage;

        $EditLink = EditLink;

        $pagecount = $PageSize;

        $CheckboxFields = CheckboxFields;

        $DispalyValueforNullFeilds = DispalyValueforNullFeilds;

        $DeleteLink = DeleteLink;

        $RefreshButtonID = RefreshButtonID;

        $SearchButtonID = SearchButtonID;

        $OrderBy = OrderBy;
        $defaultOrderBy = $defaultOrderBy == "" ? OrderBy : $defaultOrderBy;

        $linktooltips = linktooltips;


        $("#" + $RefreshButtonID + "").attr("onclick", "RefershData()");
        $("#" + $SearchButtonID + "").attr("onclick", "SearchResult()");

        //End of Assigining All parameters to global variables to store the data


        //We are storing the orginal data with out filtered

        if (!$IsSearchedData)
            $OrginalData = ResponseData;

        //End We are storing the orginal data with out filtered


        //Calcualting PageSize

        $TotalPages = $TotalRecords / RecordsPerPage;

        $TotalPages = $TotalPages <= 1 ? 1 : $TotalPages;


        //End of Calcualting PageSize

        ///Creating Footer Of Grid 

        var $actualpages = $TotalPages;
        //if ($TotalPages >= 1) {

        if ((new Number($TotalPages) % 1) != 0)
            $TotalPages = new Number($TotalPages) + new Number(1);

        $TotalPages = new Number($TotalPages.toString().split('.')[0]);

        var $html = '';

        // if ($TotalRecords >= 5) {

        $html += "<div class='pagestodispay' > Records per page : <select onchange='pagestodiaply(this)'  id='" + $GridDivID + "dis'>";

        if ($TotalRecords > 5) {
            $html += "<option value='5'>5</option>";
        }
        if ($TotalRecords > 10) {
            $html += "<option value='10'>10</option>";
        }
        if ($TotalRecords > 20) {
            $html += "<option value='20'>20</option>";
        }
        if ($TotalRecords > 30) {
            $html += "<option value='30'>30</option>";
        }
        if ($TotalRecords > 40) {
            $html += "<option value='40'>40</option>";
        }
        if ($TotalRecords > 50) {
            $html += "<option value='50'>50</option>";
        }

        $html += "<option value='-1'>All</option></select></div>";

        $("#" + $PagingDivID + "").
            append(
            $html + "<div class='Records'><span class='currentrecords'></span></div><div class='first'  onclick='firstlast(this)'>First</div><div class='forward'  id='" + $GridDivID + "bac' onclick='pagesetup(this.id)' >....</div><div class='pages' id='" + $GridDivID + "pages' ></div><div class='forward' id='" + $GridDivID + "for' onclick='pagesetup(this.id)'>....</div><div class='last' onclick='firstlast(this)'>Last</div><div class='PageHelp'>Page: <b><span id='" + $GridDivID + "page'>1</span></b> of <b>" + $TotalPages.toString().split('.')[0] + "</b></div><div class='totalrecords'>Total Records :" + $TotalRecords + "</div><div class='export'> <img src='Images/excel.png' onclick=exportexcel() title='Import to excel' /></div>");

        if ($TotalRecords > $PageSize)
            $selectedvalue = $PageSize;
        else
            $selectedvalue = -1;

        $("#" + $GridDivID + "dis").val($selectedvalue.toString());

        if ($TotalPages > 10) {
            $("#" + $GridDivID + "for").show();
        }
        if ($selectedvalue == -1) {
            $startrecordnum = 0;
            $endrecordnum = $TotalRecords;
        }
        else {
            $startrecordnum = $PageSize * ($CurrentPage);
            if ($CurrentPage + 1 != $TotalPages)
                $endrecordnum = $PageSize * ($CurrentPage + 1);
            else
                $endrecordnum = $TotalRecords;
        }
        //if ($selectedvalue == -1)
        //    $endrecordnum = $TotalRecords;
        //else
        //    $endrecordnum = $PageSize;

        ///End of creating Footer of grid


        //Creating Tables for pages based on Data and and Pagesize attribute
        $HtmlTable = "<table cellspacing='0'  id='" + $GridDivID + "tbl'  ><thead>";
        for (var p = 0; p < $actualpages; p++) {
            var $HtmlHeader = "";

            if (p == 0) {

                //  $HtmlTable += "<thead>";

                for (var h = 0; h < $HeaderNames.length; h++) {

                    var $index = jQuery.inArray($SortingFields[h], $OrderBy);

                    if ($index >= 0) {
                        $HtmlTable += "<th  style='width:" + new Number(new Number($ColumnWidths[h]) - new Number(2)) + "%;text-align:" + $TextAlignMents[h] + "'  value='" + $SortingFields[h] + "'  onclick='DataSorting(this)'  onmouseenter='Issort(this)'  asc='" + $OrderBy[1] + "'>" + $HeaderNames[h] + "</th>";
                    }
                    else {
                        $HtmlTable += "<th  style='width:" + new Number(new Number($ColumnWidths[h]) - new Number(2)) + "%;text-align:" + $TextAlignMents[h] + "'  value='" + $SortingFields[h] + "'  onclick='DataSorting(this)'  onmouseenter='Issort(this)' >" + $HeaderNames[h] + "</th>";
                    }
                }
            }

            if (p < 10)
                $("#" + $GridDivID + "pages").append("<span onclick='PageNation($(this).index())' class='pagespan'>" + (new Number(p) + new Number(1)) + "</span>");

            else {
                $("#" + $GridDivID + "pages").append("<span onclick='PageNation($(this).index())' class='pagespan' style='display:none'>" + (new Number(p) + new Number(1)) + "</span>");
            }
        }
        $HtmlTable += "</thead><tbody></tbody></table>";

        $("#" + $GridDivID + "").append($HtmlTable);
        //End Creating Tables for pages based on Data and and Pagesize attribute
        $("#" + $GridDivID + "pages span:eq(" + $CurrentPage + ")").addClass("selectedpage");
        // JqueryRecords();
        sortResults($OrderBy[0], $OrderBy[1]);

    } catch (e) {
        alert(e);
    }
}


function JqueryRecords() {
    try {

        if ($EditDivID != "") {
            $(".prevnextdiv").remove();
            $("#" + $EditDivID+" .btntag:last").prepend("<div class='prevnextdiv'><span class='prev' onclick='backward()'>Prev</span><span class='next' onclick='forward()'>Next</span></div>");
        }

        $("#" + $GridDivID + "tbl tbody").empty();
        for (var j = $startrecordnum; j < $endrecordnum ; j++) {
            var $AllRows = "<tr>";

            for (var z = 0; z < $DataFields.length; z++) {

                if ($CheckboxFields.length > 0) {

                    var $index = jQuery.inArray($DataFields[z], $CheckboxFields);

                    if ($index >= 0) {

                        if ($ResponseData[j][$DataFields[z]])
                            $AllRows += "<td style='width:" + new Number(new Number($ColumnWidths[z]) - new Number(2)) + "%;text-align:" + $TextAlignMents[z] + "' ><input type='checkbox' checked='checked' disabled='disabled' /></td>";
                        else
                            $AllRows += "<td style='width:" + new Number(new Number($ColumnWidths[z]) - new Number(2)) + "%;text-align:" + $TextAlignMents[z] + "' ><input type='checkbox'  disabled='disabled' /></td>";
                    }
                    else {

                        var $data = $ResponseData[j][$DataFields[z]];

                        if ($data == null || $data == "")
                            $data = $DispalyValueforNullFeilds;

                        $AllRows += "<td style='width:" + new Number(new Number($ColumnWidths[z]) - new Number(2)) + "%;text-align:" + $TextAlignMents[z] + "' >" + $data + "</td>";
                    }
                }
                else {
                    var $data = $ResponseData[j][$DataFields[z]];

                    if ($data == null || $data == "")
                        $data = $DispalyValueforNullFeilds;

                    $AllRows += "<td style='width:" + new Number(new Number($ColumnWidths[z]) - new Number(2)) + "%;text-align:" + $TextAlignMents[z] + "' >" + $data + "</td>";
                }
            }

            if ($ColumnWidths[z] != 0) {
                $AllRows += "<td style='width:" + new Number(new Number($ColumnWidths[$ColumnWidths.length - 1]) - new Number(2)) + "%;text-align:" + $TextAlignMents[$ColumnWidths.length - 1] + "'>";

                if ($linktypes.length > 0) {

                    for (var l = 0; l < $linktypes.length; l++) {

                        if (($linkPositions[l] != "right") && (!$linktypes[l] || $linktypes[l] != "undefined")) {

                            if ($linktypes[l].toString().toUpperCase() == "I") {
                                $AllRows += "<span class='link'><img src='" + $LinkSource[l] + "' onclick='" + $ExtralinkMethods[l] + "(" + j + ")'  title='" + $linktooltips[l] + "'/></span>";
                            }
                            else {
                                $AllRows += "<span class='link' name='" + j + "' onclick='" + $ExtralinkMethods[l] + "(" + j + ")'  title='" + $linktooltips[l] + "'>" + $LinkSource[l] + "</span>";
                            }
                        }
                    }
                }

                if ($EditLink[3]) {

                    if ($EditLink[0].toString().toUpperCase() == "I")
                        $AllRows += "<span class='link' name='" + j + "' onclick='EditElements(this)' ><img src='" + $EditLink[1] + " '  title='" + $EditLink[2] + "'/></span>";
                    else
                        $AllRows += "<span class='link' name='" + j + "' onclick='EditElements(this)'  title='" + $EditLink[2] + "'>" + $EditLink[1] + "</span>";

                }
                if ($DeleteLink[3]) {

                    if ($DeleteLink[0].toString().toUpperCase() == "I")
                        $AllRows += "<span class='link' name='" + j + "' onclick='ConfirmDelete(this)' ><img src='" + $DeleteLink[1] + " ' title='" + $DeleteLink[2] + "'/></span>";
                    else
                        $AllRows += "<span class='link' name='" + j + "' onclick='ConfirmDelete(this)' title='" + $DeleteLink[2] + "'>" + $DeleteLink[1] + "</span>";
                }
                if ($linktypes.length > 0) {

                    for (var l = 0; l < $linktypes.length; l++) {

                        if (($linkPositions[l] == "right") && (!$linktypes[l] || $linktypes[l] != "undefined")) {

                            if ($linktypes[l].toString().toUpperCase() == "I") {
                                $AllRows += "<span class='link'><img src='" + $LinkSource[l] + "' onclick='" + $ExtralinkMethods[l] + "(" + j + ")'  title='" + $linktooltips[l] + "'/></span>";
                            }
                            else {
                                $AllRows += "<span class='link' name='" + j + "' onclick='" + $ExtralinkMethods[l] + "(" + j + ")'  title='" + $linktooltips[l] + "'>" + $LinkSource[l] + "</span>";
                            }
                        }
                    }
                }
                $AllRows += "</td>";
            }

            $AllRows += "</tr>";

            $("#" + $GridDivID + "tbl tbody").append($AllRows);

        }

        $(".currentrecords").text("Showing " + ($startrecordnum + 1) + " to " + $endrecordnum + " Records");
    } catch (e) {
        alert(e);
    }
}


function PageNation(ele) {
    try {
        var num = new Number(ele + 1);

        $("#" + $GridDivID + "page").text("" + num + "");

        num = ele;

        $CurrentPage = num;

        $("#" + $GridDivID + "pages span").removeClass("selectedpage");

        $("#" + $GridDivID + "pages span:eq(" + num + ")").addClass("selectedpage");

        if ($selectedvalue == -1) {
            $startrecordnum = 0;
            $endrecordnum = $TotalRecords;
        }
        else {
            $startrecordnum = $PageSize * ($CurrentPage);
            if ($CurrentPage + 1 != $TotalPages)
                $endrecordnum = $PageSize * ($CurrentPage + 1);
            else
                $endrecordnum = $TotalRecords;
        }
        $(".currentrecords").text("Showing " + $startrecordnum + " to " + $endrecordnum + " Records");

        JqueryRecords();

    }
    catch (err) {
        alert(err + " PageNation");
    }
}

function DataSorting(ele) {
    try {
        var prop = $(ele).attr('value');

        if (prop != "false") {

            var asc = ($(ele).attr('asc'));

            $("#" + $GridDivID + " table:eq(0) th").removeAttr('asc');

            if (!asc) $(ele).attr('asc', 'asc');

            if (isNaN(prop))
                prop = prop.toString();
            else
                prop = prop;
            $OrderBy[0] = prop;
            $OrderBy[1] = asc;
            sortResults(prop, asc);
        }
    }
    catch (err) {
        alert(err + " DataSorting");
    }
}

function sortResults(prop, asc) {
    try {
        $ResponseData = $ResponseData.sort(function (a, b) {
            if (asc=="asc") return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });

        JqueryRecords();
    }
    catch (err) {
        alert(err + " sortResults");
    }
}



function Issort(ele) {

    var prop = $(ele).attr('value');

    if (prop == "false") {
        $(ele).css({ "cursor": "text" });
    }
}


function pagesetup(ele) {

    var $firstcount = $("#" + $GridDivID + "pages").children('span:visible').first().index();

    var $lastcount = $("#" + $GridDivID + "pages").children('span:visible').last().index() + 1;

    if (ele == 'for') {

        if ($TotalPages > ($lastcount + 10)) {

            for (var i = 0; i <= $lastcount; i++) {
                $("#" + $GridDivID + "pages span:eq(" + i + ")").css({ "display": "none" });
            }

            for (var ij = $lastcount; ij < $lastcount + 10; ij++) {
                $("#" + $GridDivID + "pages span:eq(" + ij + ")").css({ "display": "inline-block" });
            }
        }

        else if ($TotalPages < $lastcount + 10) {

            var $remainingpages = $TotalPages - $lastcount;

            var $res = (($lastcount - 10) + $remainingpages);

            for (var i = 0; i < ($res) ; i++) {
                $("#" + $GridDivID + "pages span:eq(" + i + ")").css({ "display": "none" });
            }

            for (var ij = $lastcount; ij < $lastcount + $remainingpages; ij++) {
                $("#" + $GridDivID + "pages span:eq(" + ij + ")").css({ "display": "inline-block" });
            }

            $("#" + $GridDivID + "for").hide();
        }

        else {
            $("#" + $GridDivID + "for").hide();

            for (var i = 0; i <= $lastcount; i++) {
                $("#" + $GridDivID + "pages span:eq(" + i + ")").css({ "display": "none" });
            }

            for (var ij = $lastcount; ij < $lastcount + 11; ij++) {
                $("#" + $GridDivID + "pages span:eq(" + ij + ")").css({ "display": "inline-block" });
            }
        }

        $("#" + $GridDivID + "bac").show();
    }

    else {

        var $res = $lastcount % 10;

        if ($res == 0) {

            for (var ji = $firstcount; ji < $lastcount; ji++) {
                $("#" + $GridDivID + "pages span:eq(" + ji + ")").css({ "display": "none" });
            }

            for (var j = $firstcount - 1; j >= $firstcount - 10; j--) {
                $("#" + $GridDivID + "pages span:eq(" + j + ")").css({ "display": "inline-block" });
            }

            if ($firstcount == 10)
                $("#" + $GridDivID + "bac").hide();
        }

        else {

            var $rest = $firstcount - $res;

            for (var ji = $firstcount; ji >= $rest; ji--) {
                $("#" + $GridDivID + "pages span:eq(" + ji + ")").css({ "display": "inline-block" });
            }

            for (var j = $lastcount; j >= $lastcount - $res ; j--) {
                $("#" + $GridDivID + "pages span:eq(" + j + ")").hide();
            }
        }

        $("#" + $GridDivID + "for").show();
    }
}

function firstlast(ele) {
    try {

        var $firstorlast = $(ele).attr('class');

        if ($firstorlast == 'first') {

            PageNation(0);

            if ($TotalPages > 10) {

                for (var i = 0; i <= $TotalPages; i++) {
                    $("#" + $GridDivID + "pages span:eq(" + i + ")").css({ "display": "none" });
                }

                for (var ij = 0; ij < 10; ij++) {
                    $("#" + $GridDivID + "pages span:eq(" + ij + ")").css({ "display": "inline-block" });
                }

                $("#" + $GridDivID + "bac").hide();
                $("#" + $GridDivID + "for").show();
            }
        }

        else {

            var $num = new Number(($TotalPages - 1).toString().split('.')[0]);

            PageNation($num);

            if ($TotalPages > 10) {

                for (var j = $TotalPages; j >= 0  ; j--) {
                    $("#" + $GridDivID + "pages span:eq(" + j + ")").hide();
                }

                for (var ji = $TotalPages; ji >= $TotalPages - 10; ji--) {
                    $("#" + $GridDivID + "pages span:eq(" + ji + ")").css({ "display": "inline-block" });
                }
                $("#" + $GridDivID + "bac").show();
                $("#" + $GridDivID + "for").hide();
            }
        }
    } catch (e) {

    }
}

function SearchResult() {
    try {

        var $value = $("#" + $SearchDropDownID + "").val();

        var $txt = $("#" + $SearchTextID + "").val();

        var obj12 = $OrginalData;

        $IsSearchedData = true;

        var Newob = [];

        if (obj12 != null) {

            $txt = $txt.toUpperCase();
            for (var k = 0; k < obj12.length; k++) {
                var Exit;
                if (isNaN(obj12[k][$value]))
                    Exit = obj12[k][$value].toUpperCase();
                else
                    Exit = obj12[k][$value];

                if (Exit != null) {
                    Exit = Exit.toString();
                    var result = Exit.indexOf($txt);
                }

                if (result >= 0) {
                    Newob.push(obj12[k]);
                }
            }

            $TotalPages = 0;

            JqGrid($GridDivID, $PagingDivID, $EditDivID, $SearchDropDownID, $SearchTextID,
         $LabelMsgID, $SearchButtonID, $RefreshButtonID, $HeaderNames, $DataFields, $SortingFields, $ColumnWidths, $TextAlignMents,
         $PrimaryKey, $EditLink, $DeleteLink, $linktypes, $linktooltips, $LinkSource, $ExtralinkMethods, $linkPositions, $EmptyMessage, $DeleteMessage, Newob,
         $PageSize, $DeleteMethod, $CheckboxFields, $DispalyValueforNullFeilds, $OrderBy);
        }
    }
    catch (err) {
        alert(err + " SearchResult");
    }
}

function exportexcel() {
    try {

        var $htmlcontent = $('#' + $GridDivID + ' ').html();

        var $dummydivforxcel = "<div id='" + $GridDivID + "dummydiv'>" + $htmlcontent + "</div>";

        $("#" + $GridDivID + "").append($dummydivforxcel);

        $("#" + $GridDivID + "dummydiv  table").removeAttr("display");
        $("#" + $GridDivID + "dummydiv  table").css({ "width": "100%" });
        $("#" + $GridDivID + "dummydiv  table").attr("border", "1");

        $("#" + $GridDivID + "dummydiv  table").each(function (index) {

            $("#" + $GridDivID + "dummydiv  table:eq(" + index + ")  tr").each(function (tr) {
                if (tr == 0)
                    $("#" + $GridDivID + "dummydiv  table:eq(" + index + ")  tr:eq(" + tr + ") th:last").remove();

                $("#" + $GridDivID + "dummydiv  table:eq(" + index + ")  tr:eq(" + tr + ") td:last").remove();
            });
        });

        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($("#" + $GridDivID + "dummydiv").html()));

        $("#" + $GridDivID + "dummydiv").remove();

        e.preventDefault();

    } catch (e) {

    }
}

function ConfirmDelete(ele) {

    try {

        var div = "<div id='" + $GridDivID + "JqGridconfirm' class='dialog-modal'>" +
               "<div style='text-align: center'>" +
              "Are you sure want to continue with this option?<br />" +
                 "<br />" +
                 "<input type='button' value='Continue' id='" + $GridDivID + "btnJqGridconfirmYes'/>" +
               "</div>" +
      "</div>";

        $("html body").append(div.toString());

        $("#" + $GridDivID + "JqGridconfirm").dialog({
            modal: true,
            appendTo: "form",
            create: function (event) { $(event.target).parent().css('position', 'fixed'); },
            title: "ConfirmBox",
            close: function () { $(this).remove(); }
        });

        $("#" + $GridDivID + "btnJqGridconfirmYes").removeAttr('name');

        var ID = new Number($(ele).attr('name'));

        $("#" + $GridDivID + "btnJqGridconfirmYes").attr('name', ID);

        $("#" + $GridDivID + "btnJqGridconfirmYes").attr('onclick', "DeleteElements(" + ID + ")");


    } catch (e) {
        alert(e);
    }
}

function pagestodiaply(ele) {
    try {
        if ($(ele).val() != "-1") {
            $PageSize = $(ele).val();
            $selectedvalue = $(ele).val();
            $CurrentPage = 0;
        }
        else {
            $PageSize = $TotalRecords;
            $selectedvalue = -1;
            $CurrentPage = 0;
        }

        JqGrid($GridDivID, $PagingDivID, $EditDivID, $SearchDropDownID, $SearchTextID,
      $LabelMsgID, $SearchButtonID, $RefreshButtonID, $HeaderNames, $DataFields, $SortingFields, $ColumnWidths, $TextAlignMents,
      $PrimaryKey, $EditLink, $DeleteLink, $linktypes, $linktooltips, $LinkSource, $ExtralinkMethods, $linkPositions, $EmptyMessage, $DeleteMessage, $OrginalData,
      $PageSize, $DeleteMethod, $CheckboxFields, $DispalyValueforNullFeilds, $OrderBy);

    } catch (e) {

    }
}

function RefershData() {
    try {
        $pagecount = $PageSize;
        $TotalPages = 0;
        $CurrentPage = 0;
        $startrecordnum = 0;
        $endrecordnum = $DefaultPageCount;
        $IsSearchedData = false;

        $("#" + $SearchTextID + "").val("");

        JqGrid($GridDivID, $PagingDivID, $EditDivID, $SearchDropDownID, $SearchTextID,
     $LabelMsgID, $SearchButtonID, $RefreshButtonID, $HeaderNames, $DataFields, $SortingFields, $ColumnWidths, $TextAlignMents,
     $PrimaryKey, $EditLink, $DeleteLink, $linktypes, $linktooltips, $LinkSource, $ExtralinkMethods, $linkPositions, $EmptyMessage, $DeleteMessage, $OrginalData,
     $PageSize, $DeleteMethod, $CheckboxFields, $DispalyValueforNullFeilds, $defaultOrderBy);

    }
    catch (err) {
        alert(err + " Refersh");
    }
}
function RemoveRecord() {
    try {
        $pagecount = $PageSize;
        $TotalPages = 0;
        if ($startrecordnum == $endrecordnum) {
            $startrecordnum = $startrecordnum - $PageSize;
            $endrecordnum = $startrecordnum - 1;
        }
        $IsSearchedData = false;

        $("#" + $SearchTextID + "").val("");

        JqGrid($GridDivID, $PagingDivID, $EditDivID, $SearchDropDownID, $SearchTextID,
     $LabelMsgID, $SearchButtonID, $RefreshButtonID, $HeaderNames, $DataFields, $SortingFields, $ColumnWidths, $TextAlignMents,
     $PrimaryKey, $EditLink, $DeleteLink, $linktypes, $linktooltips, $LinkSource, $ExtralinkMethods, $linkPositions, $EmptyMessage, $DeleteMessage, $OrginalData,
     $PageSize, $DeleteMethod, $CheckboxFields, $DispalyValueforNullFeilds, $OrderBy);

    }
    catch (err) {
        alert(err + " Refersh");
    }
}
function DeleteElements(ele) {
    try {
        var ID = $ResponseData[ele][$PrimaryKey];

        $.ajax({
            type: "POST",
            url: $DeleteMethod,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ID: ID }),
            success: function (response) {

                $("#" + $LabelMsgID + "").text(response.d);

                if ($("#" + $LabelMsgID + "").text() == "") {
                    var tempdata = [];
                    for (var i in $OrginalData) {
                        if ($OrginalData[i][$PrimaryKey] != ID) {
                            tempdata.push($OrginalData[i]);
                        }
                    }
                    $OrginalData = tempdata;
                    RemoveRecord();
                    $("#" + $LabelMsgID + "").text($DeleteMessage);
                }
            },
            error: function (response) {
                alert("failure : " + response.statusText);
            }
        });
    }
    catch (err) {
        alert(err + " DeleteElements");
    }
    $("#" + $GridDivID + "JqGridconfirm").remove();
}

function forward() {
    try {

        var id = new Number($EditIndex) + new Number(1);

        if (id >= $TotalRecords)
            id = 0;

        $EditIndex = id;
        backwardreversdata(id);
    }
    catch (err) {
        alert(err + " forward");
    }
}

function backward() {
    try {
        var id = new Number($EditIndex) - new Number(1);

        if (id < 0)
            id = $TotalRecords - 1;

        $EditIndex = id;
        backwardreversdata(id);

    }
    catch (err) {
        alert(err + " backward");
    }
}

function EditElements(ele) {
    try {

        var number = new Number($(ele).attr('name'));

        $("#" + $EditDivID + "").dialog({
            width: "auto",
            modal: true,
            appendTo: "form",
            create: function (evt) { $(evt.target).parent().css('position', 'fixed'); },
            title: "Update",
        });

        $EditIndex = number;

        backwardreversdata(number);
    }
    catch (err) {
        alert(err + " EditElements");
    }
}

