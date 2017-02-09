using System;
using System.ComponentModel;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.WebControls;
using System.Web.UI;
using System.Collections;
using Microsoft.SharePoint;
using System.Collections.Generic;


namespace WebParts.Accordion
{
    [ToolboxItemAttribute(false)]
    public partial class Accordion : WebPart, IWebEditable
    {

        protected string ProtParamListPath;
        [Personalizable(PersonalizationScope.Shared), WebBrowsable(false)]
        public string ParamListPath
        {
            get
            {
                if (ProtParamListPath == null)
                {
                    //return "Accordion List";
                    return "";
                }
                else
                {

                    return ProtParamListPath;
                }

            }
            set
            {
                ProtParamListPath = value;
            }
        }

        protected string ProtParamSiteUrl;
        [Personalizable(PersonalizationScope.Shared), WebBrowsable(false)]
        public string ParamSiteUrl
        {
            get
            {
                if (ProtParamSiteUrl == null)
                {
                    return SPContext.Current.Web.Url;
                }
                else
                {
                    return ProtParamSiteUrl;
                }

            }
            set
            {
                ProtParamSiteUrl = value;
            }
        }

        // Uncomment the following SecurityPermission attribute only when doing Performance Profiling on a farm solution
        // using the Instrumentation method, and then remove the SecurityPermission attribute when the code is ready
        // for production. Because the SecurityPermission attribute bypasses the security check for callers of
        // your constructor, it's not recommended for production purposes.
        // [System.Security.Permissions.SecurityPermission(System.Security.Permissions.SecurityAction.Assert, UnmanagedCode = true)]
        public Accordion()
        {
        }

        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            InitializeControl();
        }

        protected void Page_Load(object sender, EventArgs e)
        {
        }

        public override EditorPartCollection CreateEditorParts()
        {

            List<EditorPart> editors = new List<EditorPart>();

            EditorPart editorPart = new AccordionWPEditor();
            editorPart.ID = this.ID + "_editorPart";
            editors.Add(editorPart);
            return new EditorPartCollection(editors);
        }

    }
}
