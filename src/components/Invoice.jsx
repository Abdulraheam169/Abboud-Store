import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import arabicReshaper from "arabic-reshaper";
import Cairo from "/Cairo-Regular.ttf";

Font.register({
  family: "Cairo",
  src: Cairo,
});

const formatText = (text) => {
  if (!text) return "";
  const str = String(text);
  const hasArabic = /[\u0600-\u06FF]/.test(str);

  if (hasArabic) {
    if (typeof arabicReshaper === "function") {
      return arabicReshaper(str);
    } else if (arabicReshaper && typeof arabicReshaper.reshape === "function") {
      return arabicReshaper.reshape(str);
    } else if (arabicReshaper && typeof arabicReshaper.default === "function") {
      return arabicReshaper.default(str);
    } else if (
      arabicReshaper &&
      arabicReshaper.default &&
      typeof arabicReshaper.default.reshape === "function"
    ) {
      return arabicReshaper.default.reshape(str);
    }
  }

  return str;
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Cairo",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#1b263b",
  },
  logoContainer: {
    flexDirection: "row",
  },
  logoAbboud: {
    fontSize: 28,
    color: "#1A252C",
    fontWeight: "bold",
  },
  logoStore: {
    fontSize: 28,
    color: "#1b263b",
    fontWeight: "bold",
    marginLeft: 5,
  },
  invoiceTitle: {
    fontSize: 14,
    color: "#7F8C8D",
    letterSpacing: 2,
    textAlign: "right",
  },
  invoiceDate: {
    fontSize: 10,
    color: "#34495E",
    marginTop: 5,
    textAlign: "right",
  },
  customerSection: {
    marginBottom: 30,
  },
  billToTitle: {
    fontSize: 12,
    color: "#1b263b",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  customerText: {
    fontSize: 11,
    color: "#2C3E50",
    marginBottom: 4,
    textAlign: "left",
  },
  table: {
    width: "100%",
    flexDirection: "column",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8F9F9",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#BDC3C7",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  col1: { width: "40%", textAlign: "left" },
  col2: { width: "20%", textAlign: "center" },
  col3: { width: "20%", textAlign: "center" },
  col4: { width: "20%", textAlign: "left" },
  tableHeaderText: {
    fontSize: 10,
    color: "#1A252C",
  },
  tableCell: {
    fontSize: 10,
    color: "#34495E",
  },
  itemTitle: {
    fontSize: 11,
    color: "#1A252C",
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 9,
    color: "#7F8C8D",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#BDC3C7",
  },
  totalLabel: {
    fontSize: 14,
    color: "#1A252C",
    marginRight: 15,
  },
  totalValue: {
    fontSize: 18,
    color: "#1b263b",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingTop: 15,
  },
  footerText: {
    fontSize: 10,
    color: "#7F8C8D",
  },
});

export default function Invoice({ userInfo = {}, items = [], total = 0 }) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoAbboud}>Abboud</Text>
            <Text style={styles.logoStore}>Store</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceDate}>Date: {today}</Text>
          </View>
        </View>

        <View style={styles.customerSection}>
          <Text style={styles.billToTitle}>Bill To:</Text>
          <Text style={styles.customerText}>
            Name: {formatText(userInfo?.name || "Customer Name")}
          </Text>
          <Text style={styles.customerText}>
            Address: {formatText(userInfo?.address || "-")}
          </Text>
          <Text style={styles.customerText}>
            Phone: {formatText(userInfo?.phone || "-")}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col1, styles.tableHeaderText]}>
              Item Description
            </Text>
            <Text style={[styles.col2, styles.tableHeaderText]}>Price</Text>
            <Text style={[styles.col3, styles.tableHeaderText]}>Qty</Text>
            <Text style={[styles.col4, styles.tableHeaderText]}>Total</Text>
          </View>

          {items.map((item) => {
            const singlePrice = item.newPrice
              ? Number(item.newPrice).toFixed(2)
              : "0.00";

            const totalItemPrice = item.totalPrice
              ? Number(item.totalPrice).toFixed(2)
              : (Number(singlePrice) * (item.quantity || 1)).toFixed(2);

            return (
              <View style={styles.tableRow} key={item.id || Math.random()}>
                <View style={styles.col1}>
                  <Text style={styles.itemTitle}>
                    {formatText(item.title || "Product")}
                  </Text>
                  <Text style={styles.itemDesc}>
                    {formatText(item.description || "No description")}
                  </Text>
                </View>
                <Text style={[styles.col2, styles.tableCell]}>
                  ${singlePrice}
                </Text>
                <Text style={[styles.col3, styles.tableCell]}>
                  {item.quantity || 1}
                </Text>
                <Text style={[styles.col4, styles.tableCell]}>
                  ${totalItemPrice}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>${Number(total).toFixed(2)}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for shopping with Abboud Store! We appreciate your
            business.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
