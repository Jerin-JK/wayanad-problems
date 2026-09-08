import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProblems = [
  {
    title: 'Landslide-prone road near Meppadi needs urgent repair',
    description: 'The road connecting Meppadi to Chooralmala has been severely damaged after the recent monsoon. Multiple sections have caved in due to landslides, making it extremely dangerous for commuters. Heavy vehicles are unable to pass, affecting local businesses and daily wage workers who depend on this route. The PWD has been notified multiple times but no action has been taken so far. This is a critical lifeline road for the entire region.',
    category: 'Infrastructure',
    location: 'Meppadi, Wayanad',
    status: 'reported',
    upvotes: 47,
    reporterName: 'Rajesh Kumar',
    images: '[]',
  },
  {
    title: 'Wild elephant menace in Bathery agricultural fields',
    description: 'Farmers in Sultan Bathery are facing repeated crop destruction by wild elephants entering their fields at night. Over 15 acres of banana and coffee plantations have been destroyed in the last month alone. The existing elephant-proof trenches are insufficient and poorly maintained. Farmers are requesting solar-powered electric fences and better compensation for crop losses. This is a recurring problem that affects livelihoods of hundreds of families.',
    category: 'Environment',
    location: 'Sultan Bathery, Wayanad',
    status: 'in_progress',
    upvotes: 83,
    reporterName: 'Priya Menon',
    images: '[]',
  },
  {
    title: 'Primary Health Centre in Pulpally lacks basic facilities',
    description: 'The Primary Health Centre in Pulpally is severely understaffed and lacks basic medical equipment. There is only one doctor for a population of over 20,000 people. The X-ray machine has been non-functional for 6 months. Patients with serious conditions have to travel 45 km to Mananthavady or Kalpetta for treatment. Pregnant women from tribal communities are particularly affected due to lack of proper maternity care.',
    category: 'Healthcare',
    location: 'Pulpally, Wayanad',
    status: 'reported',
    upvotes: 62,
    reporterName: null,
    images: '[]',
  },
  {
    title: 'Tribal school in Noolpuzha needs new building',
    description: 'The government tribal school in Noolpuzha panchayat is in a dilapidated condition. The roof leaks during monsoon, and students are forced to sit in waterlogged classrooms. The building was constructed over 30 years ago and has never been renovated. There are no proper toilets, and the mid-day meal kitchen is in poor hygiene condition. 120 tribal students depend on this school.',
    category: 'Education',
    location: 'Noolpuzha, Wayanad',
    status: 'reported',
    upvotes: 35,
    reporterName: 'Aisha Beevi',
    images: '[]',
  },
  {
    title: 'Coffee price crash affecting Wayanad farmers',
    description: 'Coffee farmers across Wayanad are struggling due to a sharp decline in coffee prices this season. The farm-gate price has dropped by 30% compared to last year, while input costs have risen. Many small-scale farmers are unable to cover their production costs. There is an urgent need for government intervention through minimum support price, procurement centers, and alternative market linkages. Over 70% of Wayanad families depend on coffee cultivation.',
    category: 'Agriculture',
    location: 'Kalpetta, Wayanad',
    status: 'reported',
    upvotes: 91,
    reporterName: 'Thomas Mathew',
    images: '[]',
  },
  {
    title: 'No mobile network in Thirunelli region',
    description: 'Several tribal settlements in the Thirunelli panchayat area have zero mobile network coverage. This is a serious issue as residents cannot make emergency calls, students cannot access online education resources, and government digital services are completely inaccessible. Despite being a known tourist destination, telecom companies have not invested in infrastructure here. A mobile tower has been approved but not yet installed.',
    category: 'Utilities',
    location: 'Thirunelli, Wayanad',
    status: 'in_progress',
    upvotes: 56,
    reporterName: 'Suresh Babu',
    images: '[]',
  },
  {
    title: 'Tourism waste management crisis at Edakkal Caves',
    description: 'The area around Edakkal Caves, one of Wayanad\'s most popular tourist spots, is facing a severe waste management crisis. Plastic bottles, food wrappers, and other waste litter the trekking path and surrounding forest areas. The local panchayat lacks the resources to manage the volume of tourist waste. Biodegradable waste is attracting stray animals. An urgent need for waste bins, regular cleaning drives, and strict enforcement of no-plastic zones.',
    category: 'Environment',
    location: 'Edakkal, Wayanad',
    status: 'resolved',
    upvotes: 74,
    reporterName: 'Fathima Noor',
    images: '[]',
  },
  {
    title: 'Unemployment among tribal youth in Wayanad',
    description: 'Tribal youth in Wayanad face significant unemployment and underemployment despite various government schemes. Many graduates from tribal communities are unable to find jobs due to lack of skill training, language barriers, and limited awareness of opportunities. There is a need for vocational training centers, job fairs specifically for tribal youth, and better implementation of reservation policies in local government positions.',
    category: 'Livelihood',
    location: 'Mananthavady, Wayanad',
    status: 'reported',
    upvotes: 44,
    reporterName: null,
    images: '[]',
  },
  {
    title: 'Drinking water scarcity in summer months at Panamaram',
    description: 'Residents of Panamaram and surrounding areas face acute drinking water shortage during summer months (February to May). The Kabini river water level drops significantly, and many wells run dry. The existing water supply scheme covers less than 40% of households. Women and children have to walk long distances to fetch water from remaining sources. A comprehensive water supply project has been pending approval for 3 years.',
    category: 'Utilities',
    location: 'Panamaram, Wayanad',
    status: 'reported',
    upvotes: 58,
    reporterName: 'Geetha Krishnan',
    images: '[]',
  },
];

const sampleComments = [
  {
    content: 'This road is absolutely dangerous. I nearly had an accident last week. The authorities must act immediately before someone loses their life.',
    authorName: 'Vineeth Nair',
  },
  {
    content: 'I have been commuting on this road daily for work. It adds an extra hour to my journey now because I have to take a detour through Meppadi town.',
    authorName: null,
  },
  {
    content: 'The elephant problem has been going on for years. Solar fences are the only solution that has worked in other districts. Why can\'t they implement it here?',
    authorName: 'Kavitha Devi',
  },
  {
    content: 'My grandmother had to be rushed to Kozhikode Medical College because the PHC here couldn\'t handle her emergency. 3 hours of travel when every minute mattered.',
    authorName: 'Arjun Mohan',
  },
  {
    content: 'As a parent of a student in this school, I can confirm the conditions are terrible. We are planning to shift our children to a private school if nothing changes.',
    authorName: 'Sandhya Rajan',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.problem.deleteMany();

  // Create problems
  const createdProblems = [];
  for (const problem of sampleProblems) {
    const created = await prisma.problem.create({
      data: problem,
    });
    createdProblems.push(created);
    console.log(`  ✅ Created problem: ${created.title.substring(0, 50)}...`);
  }

  // Add sample comments to first few problems
  for (let i = 0; i < sampleComments.length && i < createdProblems.length; i++) {
    await prisma.comment.create({
      data: {
        ...sampleComments[i],
        problemId: createdProblems[i].id,
      },
    });
    console.log(`  💬 Added comment to: ${createdProblems[i].title.substring(0, 40)}...`);
  }

  console.log('\n🎉 Database seeded successfully!');
  console.log(`   ${createdProblems.length} problems created`);
  console.log(`   ${sampleComments.length} comments added`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
