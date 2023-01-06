
import { Line, LineChart} from 'react-native-chart-kit';
import { useSelector, useDispatch } from "react-redux";
import { Dimensions } from "react-native";
import { getHistoryMiles } from "../store/user-actions";
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    SafeAreaView,
    View
  } from "react-native";
function BottomChart(){
    // const dispatch = useDispatch();
    // const [chartData, setChartData] = useState({{labels: ["January", "February", "March", "April", "May", "June"],
    // datasets: [
    //     {
    //       data: [
    //         Math.random() * 100,
    //         Math.random() * 100,
    //         Math.random() * 100,
    //         Math.random() * 100,
    //         Math.random() * 100,
    //         Math.random() * 100
    //       ]
    //     }
    //   ]}
        
    // });
    // const [months, setMonth] = useState({});
    // const [miles, setMiles] = useState({});
    // const user = useSelector((state)=> state.user);
    // const chart = ()=>{
    //     let userMonths = [];
    //     let userMiles = [];
    //     const data = dispatch(getHistoryMiles(user.id));
    //     for (const dataObj of data){
    //         userMonths.push(ParseInt(dataObj.month.slice(-2)));
    //         userMiles,push(ParseINt(dataObj.miles));
    //     }
    //     console.log(userMonths);
    //     console.log(userMiles);
    //         setChartData({
    //             labels: userMonths.slice(-5),
    //             datasets:[
    //                 {
    //                     data: userMiles.slice(-5),
    //                 }
    //             ]
    //         })
        
    // }
    // useEffect(() => {
    //     console.log("useeffect in diagram");
    //     chart();
    //  }, [])
    
    return(
        <View>
  <Text>Bezier Line Chart</Text>
  {/* <Line data={chartData}></Line> */}
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
    )
    //     <Line
    //     data={chartData}
    //     width={Dimensions.get('window').width - 16} // from react-native
    //     // height={220}
    //     // width={220}
    //     height = {300}
    //     yAxisLabel={'Rs'}
    //     chartConfig={{
    //     backgroundColor: '#1cc910',
    //     backgroundGradientFrom: '#eff3ff',
    //     backgroundGradientTo: '#efefef',
    //     decimalPlaces: 2, // optional, defaults to 2dp
    //     color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
    //     style: {
    //       borderRadius: 16,
    //     },
    //     }}
    //     bezier
    //     style={{
    //       marginVertical: 8,
    //       borderRadius: 16,
    //     }}
    // />
    // )
}

export default BottomChart;