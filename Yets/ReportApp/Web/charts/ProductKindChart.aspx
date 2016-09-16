<%@ Page Title="" Language="C#" MasterPageFile="~/Charts/Chart.Master" AutoEventWireup="true" CodeBehind="ProductKindChart.aspx.cs" Inherits="ReportApplication.Charts.ProductKindChart" %>
<asp:Content ID="Content1" ContentPlaceHolderID="_headContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="_mainContent" runat="server">
    <telerik:RadHtmlChart runat="server" ID="ReportColumnChart" Width="1200" Height="800" Transitions="true" Skin="Silk"></telerik:RadHtmlChart>
</asp:Content>

