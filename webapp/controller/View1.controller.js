sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("table.controller.View1", {
        onInit: function () {
            var oModel = new JSONModel({
                TableItems: [{
                        OrderNo: 1,
                        Matnr: "33300",
                        Qty: 1,
                        Serial: ""
                    },
                    {
                        OrderNo: 1,
                        Matnr: "27005B",
                        Qty: 1,
                        Serial: 1101
                    },
                    {
                        OrderNo: 2,
                        Matnr: "33300",
                        Qty: 2,
                        Serial: ""
                    },
                    {
                        OrderNo: 2,
                        Matnr: "27005B",
                        Qty: 1,
                        Serial: 1102
                    },
                    {
                        OrderNo: 3,
                        Matnr: "R11275",
                        Qty: 1,
                        Serial: 1105
                    }
                ]
            });
            this.getView().setModel(oModel);

            this._groupItemsByOrderNo();
        },

        _groupItemsByOrderNo: function () {
            var oTableItems = this.getView().getModel().getProperty("/TableItems"),
                oUniqueOrders = {},
                i;
        
            // Identify unique order numbers
            for (i = 0; i < oTableItems.length; i++) {
                var oItem = oTableItems[i];
                if (!oUniqueOrders[oItem.OrderNo]) {
                    oUniqueOrders[oItem.OrderNo] = [];
                }
                oUniqueOrders[oItem.OrderNo].push({
                    Matnr: oItem.Matnr,
                    Qty: oItem.Qty,
                    Serial: oItem.Serial ? oItem.Serial : "Not Applicable"
                });
            }
        
            var oPage = this.getView().byId("page");
        
            // Create table for unique order numbers
            for (var key in oUniqueOrders) {
                if (oUniqueOrders.hasOwnProperty(key)) {
                    var aItems = oUniqueOrders[key];
        
                    // Create a new table
                    var oTable = new sap.m.Table();
        
                    // Add columns
                    oTable.addColumn(new sap.m.Column({
                        header: new sap.m.Text({
                            text: "OrderNo"
                        })
                    }));
                    oTable.addColumn(new sap.m.Column({
                        header: new sap.m.Text({
                            text: "Matnr"
                        })
                    }));
                    oTable.addColumn(new sap.m.Column({
                        header: new sap.m.Text({
                            text: "Qty"
                        })
                    }));
                    oTable.addColumn(new sap.m.Column({
                        header: new sap.m.Text({
                            text: "Serial"
                        })
                    }));
        
                    // Add items
                    for (var j = 0; j < aItems.length; j++) {
                        var oColumnListItem = new sap.m.ColumnListItem();
                        if (j === 0) {
                            oColumnListItem.addCell(new sap.m.Text({
                                text: key
                            }));
                        } else {
                            oColumnListItem.addCell(new sap.m.Text());
                        }
                        oColumnListItem.addCell(new sap.m.Text({
                            text: aItems[j].Matnr
                        }));
                        oColumnListItem.addCell(new sap.m.Text({
                            text: aItems[j].Qty
                        }));
                        oColumnListItem.addCell(new sap.m.Text({
                            text: aItems[j].Serial
                        }));
                        oTable.addItem(oColumnListItem);
                    }
                    oTable.addStyleClass("sapUiSmallMarginTop");
                    oPage.addContent(oTable);
                }
            }
        }
        

        
    });
});


