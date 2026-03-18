import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Seed Services
    await prisma.service.createMany({
        data: [
            { title: "Personal Training", description: "One-on-one sessions tailored to your fitness goals.", icon: "dumbbell" },
            { title: "Group Classes", description: "High-energy group workouts including HIIT, Yoga, and Zumba.", icon: "users" },
            { title: "Cardio Zone", description: "State-of-the-art cardio equipment for endurance training.", icon: "heart" },
            { title: "Strength Training", description: "Full range of free weights and machines for strength building.", icon: "activity" },
            { title: "Nutrition Coaching", description: "Expert dietary guidance to complement your training.", icon: "apple" },
            { title: "Sauna & Recovery", description: "Post-workout recovery facilities to keep you at your best.", icon: "thermometer" },
        ],
        skipDuplicates: true,
    });

    // Seed Trainers
    await prisma.trainer.createMany({
        data: [
            { name: "Alex Johnson", specialty: "Strength & Conditioning", bio: "10+ years helping athletes reach peak performance.", imageUrl: null },
            { name: "Sarah Williams", specialty: "Yoga & Mindfulness", bio: "Certified yoga instructor with a passion for holistic wellness.", imageUrl: null },
            { name: "Marcus Lee", specialty: "HIIT & Cardio", bio: "Former competitive athlete turned fitness coach.", imageUrl: null },
        ],
        skipDuplicates: true,
    });

    // Seed Memberships
    await prisma.membership.createMany({
        data: [
            {
                name: "Basic",
                price: 29.99,
                duration: "monthly",
                features: ["Gym access (6am–10pm)", "Locker room access", "2 group classes/month"],
                isPopular: false,
            },
            {
                name: "Pro",
                price: 59.99,
                duration: "monthly",
                features: ["24/7 gym access", "Unlimited group classes", "1 personal training session/month", "Nutrition consultation"],
                isPopular: true,
            },
            {
                name: "Elite",
                price: 99.99,
                duration: "monthly",
                features: ["24/7 gym access", "Unlimited group classes", "4 personal training sessions/month", "Monthly nutrition plan", "Sauna & recovery access"],
                isPopular: false,
            },
        ],
        skipDuplicates: true,
    });

    console.log("✅ Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
