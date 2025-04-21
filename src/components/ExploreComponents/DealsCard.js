// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import React from "react";
// import { LinearGradient } from "expo-linear-gradient";

// const DealsCard = () => {
//   return (
//     <ScrollView style={styles.scrollContainer} horizontal={true}>
//       {/* <TouchableOpacity style={styles.card}>*/}
//       <TouchableOpacity style={styles.container}>
//         <LinearGradient
//           colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
//           style={styles.gradientBackground} // Add a new style for the gradient background
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>Iphone</Text>
//             <Text style={styles.price}>price: 410KD</Text>
//           </View>
//         </LinearGradient>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.container}>
//         <LinearGradient
//           colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
//           style={styles.gradientBackground} // Add a new style for the gradient background
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>Iphone</Text>
//             <Text style={styles.price}>price: 410KD</Text>
//           </View>
//         </LinearGradient>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.container}>
//         <LinearGradient
//           colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
//           style={styles.gradientBackground} // Add a new style for the gradient background
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>Iphone</Text>
//             <Text style={styles.price}>price: 410KD</Text>
//           </View>
//         </LinearGradient>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.container}>
//         <LinearGradient
//           colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
//           style={styles.gradientBackground} // Add a new style for the gradient background
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>Iphone</Text>
//             <Text style={styles.price}>price: 333 KD</Text>
//           </View>
//         </LinearGradient>
//       </TouchableOpacity>{" "}
//       <TouchableOpacity style={styles.container}>
//         <LinearGradient
//           colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
//           style={styles.gradientBackground} // Add a new style for the gradient background
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>Iphone</Text>
//             <Text style={styles.price}>price: 333 KD</Text>
//           </View>
//         </LinearGradient>
//       </TouchableOpacity>
//     </ScrollView>
//     // </View>
//   );
// };

// export default DealsCard;

// const styles = StyleSheet.create({
//   viewContainer: { marginTop: -70 },
//   container: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     overflow: "hidden",
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginHorizontal: 8,
//     width: 100, // Set the width here instead of maxWidth for more control
//     height: 160, // You can set a fixed height to avoid overflowing
//   },
//   dealsText: {
//     // alignSelf: "stretch",
//     marginTop: 40,
//     marginLeft: 20,
//     fontSize: 10,
//     fontWeight: "bold",
//     // marginBottom: 10,
//   },
//   Text: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   scrollContainer: {
//     flexDirection: "row",
//     padding: 10,
//   },
//   gradientBackground: {
//     flex: 1,
//     borderRadius: 18,
//   },
//   imageContainer: {
//     height: 100,
//     width: "100%",
//     backgroundColor: "#F2F3F2",
//     alignSelf: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   infoContainer: {
//     padding: 12,
//   },
//   name: {
//     alignSelf: "center",
//     fontFamily: "Lato",
//     fontSize: 25,
//     fontWeight: "600",
//     color: "#fff",
//     marginBottom: 4,
//   },
//   price: {
//     alignSelf: "center",
//     fontFamily: "Lato",
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#fff",
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const DealCard = ({ name, price, image, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.imageContainer}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
    {/* <LinearGradient
      colors={["#26589c", "#9cb2d8"]}
      style={styles.gradientBackground}
    >
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Price: {price} KD</Text>
      </View>
    </LinearGradient> */}
  </TouchableOpacity>
);

const DealsCard = () => {
  const deals = [
    {
      id: "1",
      name: "iPhone 13",
      price: "410",
      image: require("../../../assets/deal1.png"),
    },
    {
      id: "2",
      name: "iPhone 14",
      price: "520",
      image: require("../../../assets/deal2fix.jpg"),
    },
    {
      id: "3",
      name: "iPhone 15",
      price: "650",
      image: require("../../../assets/deal3.png"),
    },
  ];

  return (
    <ScrollView
      style={styles.scrollContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          name={deal.name}
          price={deal.price}
          image={deal.image}
          onPress={() => console.log("Deal pressed:", deal.name)}
        />
      ))}
    </ScrollView>
  );
};

export default DealsCard;

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    padding: 10,
  },
  container: {
    width: 170,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  gradientBackground: {
    paddingBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContainer: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#f0f0f0",
  },
});
