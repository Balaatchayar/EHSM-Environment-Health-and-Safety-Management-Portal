sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.Incident", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Incident").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
    var oModel = this.getOwnerComponent().getModel();

    // Replace with the correct EntitySet name from metadata (check <EntitySet Name="...">)
    oModel.read("/ZGRH_EHSM_INCIDENTS", {
        success: function (oData) {
            console.log("Incident Data:", oData.results);

            if (oData.results.length > 0) {
                // Print field names from first record
                console.log("Available fields:", Object.keys(oData.results[0]));
            }
        },
        error: function (e) {
            console.error("Incident fetch failed", e);
        }
    });

    sap.m.MessageToast.show("Incident Management loaded");
},

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var oTable = this.byId("incidentTable");
            var oBinding = oTable.getBinding("items");

            if (sQuery && sQuery.length > 0) {
                var aFilters = [
                    new Filter("IncidentId", FilterOperator.Contains, sQuery),
                    new Filter("Title", FilterOperator.Contains, sQuery)
                ];
                oBinding.filter(new Filter({
                    filters: aFilters,
                    and: false
                }));
            } else {
                oBinding.filter([]);
            }
        }

    });
});
