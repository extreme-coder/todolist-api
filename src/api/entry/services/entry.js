'use strict';

/**
 * entry service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::entry.entry', ({ strapi }) => ({
    async daysLeft(deadline) {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline);
        const dayDiff = 1 + Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));
        return dayDiff
    }
}))