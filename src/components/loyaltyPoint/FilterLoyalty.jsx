function FilterLoyalty({
  setSelectedSort,
  selectedSort,
  setSelectedReason,
  setSelectedPointsHistory,
  selectedReason,
  selectedPointsHistory,
}) {
  return (
    <div className="flex items-center gap-2 ">
      <select
        value={selectedSort}
        className="pill-primary border-dashed w-50"
        onChange={(e) => setSelectedSort(e.target.value)}
      >
        <option value="">{selectedSort === "" ? "Filter" : "Default"}</option>
        <option value="By Reason">By Reason</option>
        <option value="By Points History">By Points History</option>
      </select>
      {selectedSort === "By Reason" && (
        <select
          value={selectedReason}
          className="pill-primary border-dashed w-50"
          onChange={(e) => setSelectedReason(e.target.value)}
        >
          <option value="All">All</option>
          <option value="SURVEY_PARTICIPATION">
            Survey Participation Reward
          </option>
          <option value="SIGNUP">Signup Reward</option>
          <option value="VOUCHER_REDEEMED">Coupon Redeem</option>
          <option value="BONUS">Bonus</option>
        </select>
      )}
      {selectedSort === "By Points History" && (
        <select
          value={selectedPointsHistory}
          className="pill-primary border-dashed w-50"
          onChange={(e) => setSelectedPointsHistory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Gain">Gain</option>
          <option value="Spend">Spend</option>
        </select>
      )}
    </div>
  );
}

export default FilterLoyalty;
