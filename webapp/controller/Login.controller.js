sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.Login", {

        onInit: function () {},

        onLoginPress: function () {
            var oView  = this.getView();
            var empId  = oView.byId("empIdInput").getValue();
            var pwd    = oView.byId("passwordInput").getValue();

            if (!empId || !pwd) {
                MessageBox.error("Please enter Employee ID and Password.");
                return;
            }

            // Use the default OData v2 model from manifest
            var oModel = this.getOwnerComponent().getModel();

            // IMPORTANT: correct entity set + encode values (password may have special chars)
            var sPath = "/ZGRH_EHSM_LOGIN_NEW(" +
                "p_employee_id='" + encodeURIComponent(empId) + "'," +
                "p_password='"     + encodeURIComponent(pwd)   + "'" +
            ")/Set";

            oModel.read(sPath, {
                success: function (oData) {
                    var a = (oData && oData.results) || [];
                    if (a.length > 0) {
                        // If backend returns a message field, you can inspect it:
                        // var msg = a[0].message;
                        MessageBox.success("Login successful!", {
    onClose: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("Dashboard");   // ✅ must match route name in manifest.json
    }.bind(this)
});
                    } else {
                        MessageBox.error("Invalid Employee ID or Password.");
                    }
                }.bind(this),
                error: function (oError) {
                    // Helpful logging for you
                    try { console.error("Login error", JSON.parse(oError.responseText)); } catch (e) { console.error(oError); }
                    MessageBox.error("Login failed. Please contact admin.");
                }
            });


        }
    });
});
