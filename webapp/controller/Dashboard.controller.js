sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.Dashboard", {

        onInit: function () {
            // You can fetch dashboard summary data here if needed
        },

        // 🔍 Search filter for tiles
        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue") || "";
            var oTileContainer = this.byId("tileContainer");

            oTileContainer.getTiles().forEach(function (oTile) {
                var bVisible = oTile.getTitle().toLowerCase().includes(sQuery.toLowerCase());
                oTile.setVisible(bVisible);
            });
        },

        // 🚨 Incident tile press
        onIncidentPress: function () {
            MessageToast.show("Navigating to Incident Management...");
            this.getOwnerComponent().getRouter().navTo("Incident");
        },

        // 🛡️ Risk tile press
        onRiskPress: function () {
            MessageToast.show("Navigating to Risk Assessment...");
            this.getOwnerComponent().getRouter().navTo("RiskAssessment");
        }
    });
});
