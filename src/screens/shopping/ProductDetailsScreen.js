// import { View, Text, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import StoresDetailsPage from "../../components/StoresComponents/StoresDetailsPage";
// import { GetStore } from "../../api/StoreAPI";

// const ProductDetailsScreen = ({ route }) => {
//   // const route = useRoute();
//   const { StoreId } = route.params;
//   console.log(StoreId);
//   const [store, setStore] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const data = await GetStore(StoreId);

//         setStore(data); // set the fetched store list here
//       } catch (error) {
//         console.error("Error fetching stores:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStores();
//   }, []);

//   const handleStorePress = (store) => {
//     // You can navigate to a detail screen here
//     console.log("Pressed store:", store.name);
//   };
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#F5F5F5",
//       }}
//     >
//       <StoresDetailsPage StoreId={StoreId} StoreDetails={store} />
//     </View>
//   );
// };

// export default ProductDetailsScreen;
