import { prisma } from "../src/lib/prisma";
import { TEMPLATES } from "../src/lib/templates";

async function main() {
  for (const template of TEMPLATES) {
    await prisma.template.upsert({
      where: { key: template.key },
      create: {
        key: template.key,
        name: template.name,
        category: template.category,
        description: template.description,
        scriptStructure: JSON.stringify(template.scriptStructure),
        captionStyle: template.captionStyle,
        visualStyle: template.visualStyle,
        musicStyle: template.musicStyle,
        transitionStyle: template.transitionStyle,
        isSystem: true,
      },
      update: {
        name: template.name,
        category: template.category,
        description: template.description,
        scriptStructure: JSON.stringify(template.scriptStructure),
        captionStyle: template.captionStyle,
        visualStyle: template.visualStyle,
        musicStyle: template.musicStyle,
        transitionStyle: template.transitionStyle,
      },
    });
  }
  console.log(`Seeded ${TEMPLATES.length} templates.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
