import getTermPaths from '@/utils/getTermPaths'

export async function GET() {
    return Response.json(getTermPaths())
}
