'use strict';

/**
 * entry controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::entry.entry', ({ strapi }) => ({
    async find(ctx) {
        const { data, meta } = await super.find(ctx)
        const newData = Object.values(data).map(async d => ({
            ...d,
            custom: null,
            ...d.custom,
            daysLeft: d.due && await strapi.service('api::entry.entry').daysLeft(d.due)
        })).reduce((acc, curr, index) => {
            acc[index] = curr;
            return acc;
        }, {})
        console.log(newData)
        return { data: newData, meta }
    },

    async findOne(ctx) {
        const { data, meta } = await super.findOne(ctx)
        return {
            data: {
                ...data,
                custom: null,
                ...data.custom,
                daysLeft: data.due && await strapi.service('api::entry.entry').daysLeft(data.due)
            },
            meta
        }
    },
}));
