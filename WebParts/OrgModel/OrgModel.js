(function () {
    $(document).ready(function () {
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            SP.SOD.registerSod("MyApplication.Resources.resx",
              "/_layouts/15/ScriptResx.ashx?name=MyApplication.Resources&culture=" +
              STSHtmlEncode(Strings.STS.L_CurrentUICulture_Name));

            //SP.SOD.executeOrDelayUntilScriptLoaded(BoardOfDirectors, "sp.js");
            ////SP.SOD.executeFunc('sp.js', 'SP.ClientContext', BoardOfDirectors);

            SP.SOD.executeFunc("MyApplication.Resources.resx", 'Resources', OrgModel)
        }, "strings.js");



    });

    function OrgModel() {
        // Window loaded, we check for registered paramers
        $.each(window.webpartparams["OrgModel"], function (index, item) {
            createDom(item);
        });

        function createDom(item) {

            var siteUrl1 = item.siteUrl;
            var listTitle1 = item.listName;
            var board = item.elementToRenderIn;

            var camlDioikitiko = new SP.CamlQuery();

            camlDioikitiko.set_viewXml('<View><Query>' +
                   '<Where>' +
            '<And>' +
               '<Eq><FieldRef Name="_ModerationStatus"/><Value Type="ModStat">0</Value></Eq>' +
               '<Eq><FieldRef Name="ItemIsActive"/><Value Type="Boolean">1</Value></Eq>' +
            '</And>' +
                '</Where>' +
                '<GroupBy Collapse="TRUE"><FieldRef Name="BoardCategory"/></GroupBy>' +
                '<GroupBy Collapse="TRUE"><FieldRef Name="BoardPosition"/></GroupBy>' +
                '<OrderBy>' +
                '<FieldRef Name="SortingOrder" Ascending="True"></FieldRef>' +
                '</OrderBy>' +
                '</Query></View>'
                );
            GetUrlKeyValue('PagePreview') && camlDioikitiko.set_viewXml(camlDioikitiko.get_viewXml().replace(
             '<Eq><FieldRef Name="_ModerationStatus"/><Value Type="ModStat">0</Value></Eq>',
             '<Neq><FieldRef Name="_ModerationStatus"/><Value Type="ModStat">1</Value></Neq>'));


            $(function () {

                if (listTitle1 != "") {
                    $.when(getOList(siteUrl1, listTitle1, camlDioikitiko)).then(
                                function (itemdata) {
                                    var listItemInfo = '<table class="board" width="100%">';
                                    listItemInfo += '    <tr class="top">';
                                    listItemInfo += '		<th align="center" class="empty" width="40%">&nbsp;</th>';
                                    listItemInfo += '		<th align="center" class="one">' + MyApplication.Resources.fldaudit + '</th>';
                                    listItemInfo += '		<th align="center" class="two">' + MyApplication.Resources.fldrisk + '</th>';
                                    listItemInfo += '		<th align="center" class="three">' + MyApplication.Resources.fldremuneration + '</th>';
                                    listItemInfo += '		<th align="center" class="four">' + MyApplication.Resources.fldcorporateGovernance + '</th>';
                                    listItemInfo += '	</tr>';
                                    listItemInfo += '	<tr class="empty">';
                                    listItemInfo += '		<td colspan="5">&nbsp;</td>';
                                    listItemInfo += '	</tr>';

                                    listItemInfo += buildContent(itemdata);

                                    $('#' + board).html(listItemInfo);

                                },
                            function errorHome(sender, args) {
                                alert('Error: ' + args.get_message());
                            });

                }
            });


            function getOList(siteUrl, listTitle, camlQuery) {

                var deferred = $.Deferred();
                var clientHomeContext = new SP.ClientContext(siteUrl);
                var oListDioikitiko = clientHomeContext.get_web().get_lists().getByTitle(listTitle);

                var itemdata = oListDioikitiko.getItems(camlQuery);
                clientHomeContext.load(itemdata, 'Include( ID, Title, ItemIsActive, _ModerationStatus, BoardCategory, BoardPosition, ProfessionalTitle, Bio, Audit, Risk, Remuneration, CorporateGovernance, SortingOrder)');


                clientHomeContext.executeQueryAsync(
                Function.createDelegate(this,
                    function () { deferred.resolve(itemdata); }),
                Function.createDelegate(this,
                    function (sender, args) { deferred.reject(sender, args); }));

                return deferred.promise();


            };

            function buildContent(itemdata) {

                var tempListItemInfo = "";
                var listItemEnumerator = itemdata.getEnumerator();

                var category = '';
                var boardPosition = '';

                while (listItemEnumerator.moveNext()) {
                    var oListItem = listItemEnumerator.get_current();
                    var now = new Date();

                    //if (oListItem.get_item('ItemIsActive') == true && oListItem.get_item('_ModerationStatus') == 0) {
                    if (oListItem.get_item('BoardCategory')[0] != category[0] && oListItem.get_item('BoardCategory')[0] != MyApplication.Resources.fldboardCategory1) {
                        tempListItemInfo += '<tr class="row-title"><td colspan="5">' + oListItem.get_item('BoardCategory') + '</td></tr>';
                    }

                    if (oListItem.get_item('BoardPosition') && oListItem.get_item('BoardPosition') != boardPosition) tempListItemInfo += '<tr class="empty position"><td colspan="5"><strong>' + oListItem.get_item('BoardPosition') + '</strong></td></tr>';
                    tempListItemInfo += '<tr>';
                    tempListItemInfo += '	<td><strong class="name">' + oListItem.get_item('Title') + '</strong> '
                    if (oListItem.get_item('ProfessionalTitle')) tempListItemInfo += oListItem.get_item('ProfessionalTitle');
                    tempListItemInfo += '		<div class="info">';
                    tempListItemInfo += '			<p><strong>' + oListItem.get_item('Title') + '</strong></p>';
                    if (oListItem.get_item('ProfessionalTitle')) tempListItemInfo += '			<p><em>' + oListItem.get_item('ProfessionalTitle') + '</em></p>';
                    tempListItemInfo += oListItem.get_item('Bio') + '</div></td>'

                    if (oListItem.get_item('Audit')[0] == MyApplication.Resources.fldnoAudit) tempListItemInfo += '<td></td>';
                    else if (oListItem.get_item('Audit')[0] == MyApplication.Resources.fldpresident) tempListItemInfo += '<td><img src="/Style Library/img/tab-circle-2.png" alt="" /></td>';
                    else if (oListItem.get_item('Audit')[0] == MyApplication.Resources.fldmember) tempListItemInfo += '<td><img src="/Style Library/img/tab-circle-1.png" alt="" /></td>';

                    if (oListItem.get_item('Risk')[0] == MyApplication.Resources.fldnoAudit) tempListItemInfo += '<td></td>';
                    else if (oListItem.get_item('Risk')[0] == MyApplication.Resources.fldpresident) tempListItemInfo += '<td><img src="/Style Library/img/tab-circle-2.png" alt="" /></td>';
                    else if (oListItem.get_item('Risk')[0] == MyApplication.Resources.fldmember) tempListItemInfo += '<td><img src="/Style Library/img/tab-circle-1.png" alt="" /></td>';

                    if (oListItem.get_item('Remuneration')[0] == MyApplication.Resources.fldnoAudit) tempListItemInfo += '<td></td>';
                    else if (oListItem.get_item('Remuneration')[0] == MyApplication.Resources.fldpresident) tempListItemInfo += '<td><img src="/Style Library/img/tab-circle-2.png" alt="" /></td>';
                    else if (oListItem.get_item('Remuneration')[0] == MyApplication.Resources.fldmember) tempListItemInfo += '<td><img src="/Style Library/img/tab-circle-1.png" alt="" /></td>';

                    if (oListItem.get_item('CorporateGovernance')[0] == MyApplication.Resources.fldnoAudit) tempListItemInfo += '<td></td>';
                    else if (oListItem.get_item('CorporateGovernance') == MyApplication.Resources.fldpresident) tempListItemInfo += '<td><img src="/Style Library/img/tab-circle-2.png" alt="" /></td>';
                    else if (oListItem.get_item('CorporateGovernance')[0] == MyApplication.Resources.fldmember) tempListItemInfo += '<td><img src="/Style Library/img/tab-circle-1.png" alt="" /></td>';
                    tempListItemInfo += '</tr>';

                    category = oListItem.get_item('BoardCategory');
                    boardPosition = oListItem.get_item('BoardPosition');
                    //}
                }

                tempListItemInfo += '<tr class="legend"><td colspan="5"><img alt="" src="/Style Library/img/tab-circle-2.png">' + MyApplication.Resources.presidentOfCommittee + '&nbsp; <img alt="" src="/Style Library/img/tab-circle-1.png">' + MyApplication.Resources.memberOfCommittee + '</td></tr>';
                tempListItemInfo += '	</table>';

                itemdata = null;
                return tempListItemInfo;

            };
        }
    };
})()
