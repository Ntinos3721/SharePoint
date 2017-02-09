<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %> 
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="OrgModel.ascx.cs" Inherits="MyApplication.WebParts.OrgModel.OrgModel" %>


<script type="text/javascript">

    if (!window.webpartparams) window.webpartparams = {};
    if (!window.webpartparams["OrgModel"]) window.webpartparams["OrgModel"] = [];
    window.webpartparams["OrgModel"].push({
        siteUrl: '<%= this.ParamSiteUrl %>',
        listName: '<%= this.ParamListPath %>',
        elementToRenderIn: '<%= this.board.ClientID %>'
        //elementToRenderIn: '#board'
    });
</script>

<SharePoint:ScriptLink ID="ScriptLinkBoard" Name="~SiteCollection/Style Library/js/OrgModel.js" runat="server" /> 



<div id ="board" runat="server"></div>
