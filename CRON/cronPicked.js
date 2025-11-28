import cron from "node-cron";
import FoodDonations from "../models/foodModel.js";



// Runs every 24 hours at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("🧹 Running daily cleanup: deleting picked donations...");
    
    const result = await FoodDonations.deleteMany({ picked: true });

    console.log(`✔ Cleanup done: Deleted ${result.deletedCount} picked donations`);
  } catch (error) {
    console.error("❌ Error running cleanup:", error);
  }
});
