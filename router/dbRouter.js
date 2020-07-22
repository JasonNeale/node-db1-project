const express = require('express')
const knex = require('../data/dbConfig')
const router = express.Router()


//#########################################################################################################################################
// ------------------------------------------------------------------ |
//                             Create                                 |
// ------------------------------------------------------------------ |

// Create 
router.post('/', async ( req, res ) => {
    const accountData = req.body
    
    try {
        const accounts = await knex('accounts').insert({name: accountData.name, budget: accountData.budget})
        res.status( 201 ).json( accounts )
    } catch (err) {
        res.status( 500 ).json({ error: 'There was an error added the new project' })
    }
})

//#########################################################################################################################################
// ------------------------------------------------------------------ |
//                             Read                                   |
// ------------------------------------------------------------------ |

// Get 
router.get('/', async ( req, res ) => {
    try {
        const accounts = await knex('accounts')
        res.status(200).json(accounts)
    } catch (err) {
        res.status(500).json({ error: "Internal server error." })
    }
 })
 
 //GET:ID: READ
 router.get('/:id', async ( req, res ) => {
    const { id } = req.params

    try {
        const accounts = await knex('accounts').where({id})
        res.status(200).json(accounts) 
    } catch (err) {
        res.status(500).json({ error: "Internal server error." })
    }
})

//#########################################################################################################################################
// ------------------------------------------------------------------ |
//                             Update                                 |
// ------------------------------------------------------------------ |

// Update 
router.put( '/:id', async ( req, res ) => {
    const { id } = req.params
    const accountData = req.body

    try {
        const accounts = await knex('accounts').update(accountData).where({id})
        res.status(200).json(accountData) 
    } catch (err) {
        res.status(500).json({ error: "Internal server error." })
    }
})

//#########################################################################################################################################
// ------------------------------------------------------------------ |
//                             Delete                                 |
// ------------------------------------------------------------------ |

// Delete 
router.delete( '/:id', async ( req, res ) => {
    const { id } = req.params
    const accountData = req.body

    try {
        const accounts = await knex('accounts').del().where({id})
        res.status(204).json({ error: `The account with ID:${id} was successfully removed.` })
    } catch (err) {
        res.status(500).json({ error: "Internal server error." })
    }
})
                     

module.exports = router