import { Firm } from "@prisma/client";

function euclideanDistance(movie1: any, movie2: any) {
  const keys = Object.keys(movie1.genres);
  const distance = keys.reduce((acc, key) => {
    if (key !== "id" && key !== "firmId") {
      acc += Math.pow(movie1.genres[key] - movie2.genres[key], 2);
    }
    return acc;
  }, 0);
  const ratingDistance = Math.pow(movie1.rating - movie2.rating, 2);

  return Math.sqrt(distance + ratingDistance);
}

function predictGenre(newMovie: Firm, k: number, listMovie: Firm[]) {
  const distances = listMovie.map((movie: Firm) => ({
    name: movie.Name,
    distance: euclideanDistance(newMovie, movie),
  }));

  distances.sort((a: any, b: any) => a.distance - b.distance);

  const nearestNeighbors = distances.slice(1, k + 1);

  // const genreCounts:any = {};
  // nearestNeighbors.forEach((neighbor:any) => {
  //   for (const key in neighbor) {
  //     if (key !== "name" && key !== "distance" && neighbor[key] === 1) {
  //       genreCounts[key] = (genreCounts[key] || 0) + 1;
  //     }
  //   }
  // });

  // let maxCount = 0;
  // let predictedGenre = "";
  // for (const genre in genreCounts) {
  //   if (genreCounts[genre] > maxCount) {
  //     maxCount = genreCounts[genre];
  //     predictedGenre = genre;
  //   }
  // }

  return nearestNeighbors;
}

export { predictGenre };
//   const newMovie = { name: "Phim Mới", action: 1, comedy: 1, scifi: 0, romance: 0, rating: 4.3 };
//   const k = 3;
//   const predictedGenre = predictGenre(newMovie, k);
//   console.log("Thể loại dự đoán cho phim mới:", predictedGenre);
