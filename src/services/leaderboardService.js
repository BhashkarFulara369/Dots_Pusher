/* I understand about RedisZSET sorted set
Zset sorts data as it is inserted. It is inserted. It keeps a list of unique 
(User IDs) sorted by a score.
O(log (N)) Speed   
*/

 


const redis = require('../config/redis');

const LEADERBOARD_KEY = 'dots_pusher:leaderboard';

class LeaderboardService {
    async addScore(userId, points){
        try{
            const newScore = await redis.zincrby(LEADERBOARD_KEY, points, userId);
            return newScore;
        
        } catch (error) {
            throw new Error('Error updating score');
        }
    async getTopPlayers(limit = 10) {
        const result = await redis.zrevrange(LEADERBOARD_KEY, 0, limit - 1, 'WITHSCORES');

    }
    }
}