import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 4,
    flex: 1,
  },
  tableHeader: {
    fontWeight: "bold",
  },
});

// Main PDF Component
const EventInvoice = ({ formData, cartItems, nurseName }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>Event Confirmation</Text>

        {/* Form Details */}
        <View style={styles.section}>
          <Text style={{ fontWeight: "bold" }}>Form Details</Text>
          <Text>Event Name: {formData.eventName}</Text>
          <Text>Doctor Name: {formData.doctorName}</Text>
          <Text>Patient Name: {formData.patientName}</Text>
          <Text>Surgery Room: {formData.surgeryRoom}</Text>
          <Text>Event Time: {formData.eventTime}</Text>
          <Text>Nurse Name: {nurseName}</Text>
        </View>

        {/* Cart Items */}
        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Cart Items
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Item Name
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Description
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Quantity
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Unit</Text>
            </View>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.tableCol}>{item.name}</Text>
                <Text style={styles.tableCol}>{item.description}</Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}>{item.unit || "Box"}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default EventInvoice;
