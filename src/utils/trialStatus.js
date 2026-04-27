export const getTrialStatus = (trialStartDate, trialEndDate) => {
  const toDate = (value) => {
    if (!value) return null;

    if (typeof value?.toDate === "function") {
      return value.toDate();
    }

    if (typeof value?.toMillis === "function") {
      return new Date(value.toMillis());
    }

    if (value instanceof Date) {
      return value;
    }

    if (
      typeof value === "object" &&
      typeof value.seconds === "number"
    ) {
      return new Date(value.seconds * 1000);
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const startDate = toDate(trialStartDate);
  const endDate = toDate(trialEndDate);

  if (!startDate || !endDate) {
    return {
      isTrialActive: false,
      isTrialExpired: true,
      daysRemaining: 0,
      hoursRemaining: 0,
      minutesRemaining: 0,
      secondsRemaining: 0,
      totalMinutesRemaining: 0,
      totalSecondsRemaining: 0,
      timeRemainingMs: 0,
      formattedTimeRemaining: "Expired",
      shortFormattedTimeRemaining: "00:00:00",
      status: "expired",
    };
  }

  const now = new Date();
  const timeRemainingMs = endDate.getTime() - now.getTime();
  const isTrialActive = timeRemainingMs > 0;
  const isTrialExpired = !isTrialActive;

  const safeRemainingMs = Math.max(0, timeRemainingMs);

  const totalSecondsRemaining = Math.floor(safeRemainingMs / 1000);
  const totalMinutesRemaining = Math.floor(safeRemainingMs / (1000 * 60));
  const totalHoursRemaining = Math.floor(safeRemainingMs / (1000 * 60 * 60));
  const daysRemaining = Math.floor(safeRemainingMs / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor(
    (safeRemainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesRemaining = Math.floor(
    (safeRemainingMs % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondsRemaining = Math.floor(
    (safeRemainingMs % (1000 * 60)) / 1000
  );

  const shortFormattedTimeRemaining = [
    String(daysRemaining * 24 + hoursRemaining).padStart(2, "0"),
    String(minutesRemaining).padStart(2, "0"),
    String(secondsRemaining).padStart(2, "0"),
  ].join(":");

  let formattedTimeRemaining = shortFormattedTimeRemaining;

  if (safeRemainingMs >= 1000 * 60 * 60 * 24) {
    if (daysRemaining === 1) {
      formattedTimeRemaining = "1 day";
    } else {
      formattedTimeRemaining = `${daysRemaining} days`;
    }
  } else if (safeRemainingMs >= 1000 * 60 * 60) {
    formattedTimeRemaining = [
      String(hoursRemaining).padStart(2, "0"),
      String(minutesRemaining).padStart(2, "0"),
      String(secondsRemaining).padStart(2, "0"),
    ].join(":");
  } else {
    formattedTimeRemaining = [
      String(minutesRemaining).padStart(2, "0"),
      String(secondsRemaining).padStart(2, "0"),
    ].join(":");
  }

  let status = "active";

  if (isTrialExpired) {
    status = "expired";
  } else if (totalHoursRemaining >= 24) {
    if (daysRemaining <= 3) {
      status = "warning";
    }
  } else if (totalMinutesRemaining <= 5) {
    status = "critical";
  } else if (totalMinutesRemaining <= 15) {
    status = "warning";
  }

  return {
    isTrialActive,
    isTrialExpired,
    daysRemaining,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    totalMinutesRemaining,
    totalSecondsRemaining,
    totalHoursRemaining,
    timeRemainingMs: safeRemainingMs,
    formattedTimeRemaining,
    shortFormattedTimeRemaining,
    status,
  };
};