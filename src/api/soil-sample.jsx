import axios from "axios";

const prefix = "soil-sample";
const baseURL = "http://localhost:3000";
const headers = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};
const SoilSampleAPI = {
  getAll: () =>
    axios
      .get(`${baseURL}/${prefix}`, {
        headers: headers,
      })
      .then((response) => {
        // console.log(response.data);
        return response.data;
      }),

  //   createCourierShipment: (courier, saleOrderId) => {
  //     const body = {
  //       saleOrderId,
  //     };
  //     return api.post(`${prefix}/${courier}/shipment`, body);
  //   },
  //   findCourierShipments: (params) => {
  //     return api.get(`${prefix}/courierShipments/find`, { params });
  //   },
  //   createMultipleCourierShipments: (courier, payload) =>
  //     api.post(`${prefix}/${courier}/shipments`, payload),
  //   cancelCourierShipment: (courier, shipmentId) =>
  //     api.put(`${prefix}/${courier}/shipment/${shipmentId}/cancel`),
};
export default SoilSampleAPI;
