import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    /*await prisma.subject.create( {
        data: {
            subjectName: 'Data Structures',
            topic: {
                create: {   topicName: 'Linked Lists'},
            },
        },

    })*/

   /* const post = await prisma.topic.update({
        where: { topicId: 1},
        data: { topicName: 'Arrays'}
    })*/

    const allData = await prisma.subject.findMany({})
    const allDataa = await prisma.topic.findMany({})
    console.dir(allData)
    console.dir(allDataa)

        //console.log(post)
        
    
}

main()
    .catch((e) => {
        throw e
    })
    .finally( async () => {
        await prisma.$disconnect()
    })