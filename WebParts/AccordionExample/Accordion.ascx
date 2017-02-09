<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> 
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %> 
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Accordion.ascx.cs" Inherits="BankPortal.WebParts.Accordion.Accordion" %>



<script type="text/javascript">
    //_spBodyOnLoadFunctionNames.push("Accordion");

    if (!window.webpartparams) window.webpartparams = {};
    if (!window.webpartparams["Accordion"]) window.webpartparams["Accordion"] = [];
    window.webpartparams["Accordion"].push({
        siteUrl: '<%= this.ParamSiteUrl %>',
        listName: '<%= this.ParamListPath %>',
        elementToRenderIn: '<%= this.accordion.ClientID %>'
        //elementToRenderIn: '#accordion'
    });
</script>
<SharePoint:ScriptLink ID="ScriptLinkAccordion" Name="~SiteCollection/Style Library/js/Accordion.js" runat="server"></SharePoint:ScriptLink>

<div id="accordion" class="filelist" runat="server"></div>
