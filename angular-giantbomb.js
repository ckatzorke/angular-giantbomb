/**
 * AngularJS based wrapperservice for GiantBomb API access http://www.giantbomb.com/
 * Uses ngResource to make the http calls.
 */
(function(window, angular, undefined) {
	'use strict';

	/**
	 * @name ngGiantBomb.$giantbomb
	 * @requires $resource
	 *
	 * @desc
	 * A basic service that wraps some basic used GiantBomb API calls for
	 *  - searching games
	 *  - looking up details for a specific game
	 *  - looking up platforms
	 * 
	 * It is 100% based on the public GiantBomb API, thus an API key is needed to perform the operations 
	 * 
	 * API calls are made using JSONP
	 */
	angular.module('ngGiantBomb', ['ngResource']).
  		factory('$giantbomb', ['$resource', function($resource) {
		var GiantBomb = {
			/**
			 * @private
			 */
		    _apiKey : '',

		    /**
		     * @name setAPIKey
		     * @param apiKey the GiantBomb API key necessary for api access
		     */
		    setAPIKey : function(apiKey){
		      console.log("Setting Api Key", apiKey);
		      this._apiKey = apiKey; 
		    },
		    
		    /**
		     * @name
		     * @param
		     */
		    gameDetails : function(gameId, callback){
		      $resource('http://www.giantbomb.com/:action/:id',
		        {
		          action: 'api/game',
		          id: gameId, 
		          field_list: 'name,description,id,original_release_date,platforms,api_detail_url,site_detail_url', 
		          api_key: this._apiKey, 
		          format: 'jsonp', 
		          json_callback: 'JSON_CALLBACK'
		        },
		        {
		          get: {method: 'JSONP'}
		        }).get({}, function(result){
		          callback(result);
		        });
		    },
		    
		    gameSearch : function(searchString, callback){
			    $resource('http://www.giantbomb.com/:action',
			        {
			          action: 'api/games', 
			          field_list: 'name,id,aliases,genres,image,original_release_date,releases,platforms,api_detail_url,site_detail_url', 
			          filter: 'name:' + searchString, 
			          api_key: this._apiKey, 
			          format: 'jsonp', 
			          json_callback: 'JSON_CALLBACK'
			        },
			        {
			          get: {method: 'JSONP'}
			        }).get({}, function(result){
			          callback(result);
			        });  
		    	}
		}
		return GiantBomb;
	}]);


})(window, window.angular);