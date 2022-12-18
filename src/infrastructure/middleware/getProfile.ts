import { Response, Request, NextFunction } from 'express'
import Profile from '@database/models/profile'

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.app.get('logger').log('Authenticating profile')
    const id = req.get('profile_id')

    if(!id) {
        req.app.get('logger').log(`Missing profile_id header`)
        return res.status(400).end('Missing profile_id header')
    }

    const profile = await Profile.findOne({
        where: { id  },
    })

    if (!profile) {
        req.app.get('logger').log(`Unauthorized profile ${id}`)
        return res.status(401).end()
    }

    req.app.set('profile', profile)
    next()
}
