export function getUserRank(rank: number): string {
  if (rank <= 100) {
    return "Club Champion";
  } else if (rank <= 500) {
    return "Elite Contender";
  } else if (rank <= 1000) {
    return "Veteran Player";
  } else{
    return "Challenger";
  }
}
