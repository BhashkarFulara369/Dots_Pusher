const redis = require('../config/redis');

class ProfileService {

    // Using the HSET it allows setting multiple fields at once.
    async updateProfile(userId, userData) {
        const key = 'user:${userId}';

        await redis.hset(key, userData);
        return userData;
    }
    async getProfile(userId) {
        const key = 'user:${userId}';
        const profile = await redis.hgetall(key);

        if (Object.keys(profile).length === 0) return null;
        return profile;
    }
}

module.exports = new ProfileService();