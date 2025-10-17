sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.RiskAssessment", {

        onInit: function () {
            // Model already defined in manifest.json as default model (mainService)
            // Table will auto-bind to /risk entitySet
        },

        // 🔍 Search function
        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || "";
            var oTable = this.byId("riskTable");
            var oBinding = oTable.getBinding("items");

            if (sQuery && oBinding) {
                var aFilters = [
                    new Filter("RiskKeyReference", FilterOperator.Contains, sQuery),
                    new Filter("AssessmentTeamMember", FilterOperator.Contains, sQuery),
                    new Filter("Role", FilterOperator.Contains, sQuery),
                    new Filter("Regulation", FilterOperator.Contains, sQuery)
                ];
                var oCombined = new Filter({ filters: aFilters, and: false });
                oBinding.filter([oCombined]);
            } else {
                oBinding.filter([]); // clear filter
            }
        },

        // Row press (optional, show details or navigate)
        onItemPress: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext();
            var sRiskId = oCtx.getProperty("RiskKeyReference");
            MessageToast.show("Selected Risk: " + sRiskId);
        }

    });
});
