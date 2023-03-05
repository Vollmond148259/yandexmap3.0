import axios from "axios";
const getHouses = async (bounds, zoom) => {
  /*
    const data = {
        zoom,
        clusterize: true,
        bounds: {
            bottomLeft: {
                lat: bounds[0][1],
                lng: bounds[0][0]
            },
            topRight: {
                lat: bounds[1][1],
                lng: bounds[1][0],
            }
        }
    };

     */

  const data = {
    bounds: {
      bottomLeft: {
        lat: 43.27787027575931,
        lng: 39.79343896728515,
      },
      topRight: {
        lat: 43.583624832072914,
        lng: 40.05093103271482,
      },
    },
    zoom: 11,
    clusterize: true,
  };

  const result = await axios.post(
    "http://localhost:8888/api/v1/features/within/coordinates",
    data
  );

  return (result && result.data && result.data.data) || [];
};

export { getHouses };
