(function () {
    $(document).ready(function () {
        ExecuteOrDelayUntilScriptLoaded(Accordion, "sp.js");
        //SP.SOD.executeFunc('sp.js', 'SP.ClientContext', Accordion);
    });

    function Accordion() {
        // Window loaded, we check for registered paramers
        $.each(window.webpartparams["Accordion"], function (index, item) {
            createDom(item);
        });

        function createDom(item) {

            var siteUrl1 = item.siteUrl;
            var listTitle1 = item.listName;
            var accordion = item.elementToRenderIn;
            
            var camlQueryAccordion = new SP.CamlQuery();

            camlQueryAccordion.set_viewXml(
               '<View><Query>' +
                   '<Where>' +
            '<And>' +
               '<Leq><FieldRef Name="PublicationDate"/><Value Type="DateTime" IncludeTimeValue="True" StorageTZ="True"><Today/>' +
               '</Value></Leq>' +
              '<And>' +
               '<Eq><FieldRef Name="_ModerationStatus"/><Value Type="ModStat">0</Value></Eq>' +
               '<Eq><FieldRef Name="ItemIsActive"/><Value Type="Boolean">1</Value></Eq>' +
               '</And>' +
            '</And>' +
                '</Where>' +
                '<OrderBy><FieldRef Name="SortingOrder" Ascending = "True"/><FieldRef Name="PublicationDate" Ascending = "False"/></OrderBy></Query>' +
                '<RowLimit>50</RowLimit></View>'
                );

            GetUrlKeyValue('PagePreview') && camlQueryAccordion.set_viewXml(camlQueryAccordion.get_viewXml().replace(
             '<Eq><FieldRef Name="_ModerationStatus"/><Value Type="ModStat">0</Value></Eq>',
             '<Neq><FieldRef Name="_ModerationStatus"/><Value Type="ModStat">1</Value></Neq>'));

            $(function () {

                if (listTitle1 != "") {
                    $.when(getOList(siteUrl1, listTitle1, camlQueryAccordion)).then(
                                function (itemdata) {

                                    var listItemInfo = '<div class="bs-example">';
                                    listItemInfo += '		<div class="panel-group" id="accordion">';
                                    listItemInfo += buildContent(itemdata);

                                    $('#' + accordion).html(listItemInfo);

                                },
                            function errorHome(sender, args) {
                                alert('Error: ' + args.get_message());
                            });
                }
            });


            function getOList(siteUrl, listTitle, camlQuery) {

                var deferred = $.Deferred();
                var clientHomeContext = new SP.ClientContext(siteUrl);
                var oListPress = clientHomeContext.get_web().get_lists().getByTitle(listTitle);

                var itemdata = oListPress.getItems(camlQuery);
                clientHomeContext.load(itemdata, 'Include(LongSummary, Title, ItemIsActive, _ModerationStatus, PublicationDate, SortingOrder)');

                clientHomeContext.executeQueryAsync(
                Function.createDelegate(this,
                    function () { deferred.resolve(itemdata); }),
                Function.createDelegate(this,
                    function (sender, args) { deferred.reject(sender, args); }));

                return deferred.promise();


            };

            function buildContent(itemdata) {

                var tempListItemInfo = "";

                var listItemEnumeratorPress = itemdata.getEnumerator();


                var i = 0;

                while (listItemEnumeratorPress.moveNext()) {
                    i++;
                    var oListItemPress = listItemEnumeratorPress.get_current();

                    //if (oListItemPress.get_item('ItemIsActive') == true && oListItemPress.get_item('_ModerationStatus') == 0 && oListItemPress.get_item('PublicationDate') < now) {
                    //if (oListItemPress.get_item('PublicationDate') < now) {
                    tempListItemInfo += '<div class="panel"><div class="panel-heading">'
                    tempListItemInfo += '<h4 class="panel-title"><a class="collapsed" href="#collapse' + accordion + i + '" data-toggle="collapse" data-parent="#accordion">' + oListItemPress.get_item('Title') + '</a></h4>';
                    tempListItemInfo += '</div><div class="panel-collapse collapse" id="collapse' + accordion + i + '" style="height: 0px;"><div class="panel-body grey">' + oListItemPress.get_item('LongSummary') + '</div></div></div>';
                    //}
                }

                tempListItemInfo += '</div></div>';

                itemdata = null;
                return tempListItemInfo;
            };

        }

    };
})()
