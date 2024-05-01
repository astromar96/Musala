const mapValidationMessages = require('../utils/mapValidationMessages');
const { Event } = require('../models/index');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

async function create(req, res) {
    try {
  
      const result = validationResult(req); 
      if(result.isEmpty()){
        const data = req.body;
  
        const event = await Event.create({
          name: data.name,
          attendees_count:parseInt(data.attendees_count),
          date: data.date,
          description: data.description,
          category: data.category,
          
        });
  
        res.status(201).json({
          success: true,
          data:{
            event: {
              id: event.id,
              name: event.name,
              attendees_count:event.attendees_count,
              date: event.date,
              description: event.description,
              category: event.category,
            }
          }
        })
  
      } else {
        res.status(400).json({success:false,errors:
          mapValidationMessages(result.array())
        });
      }
    } catch(e){
      res.status(500).json({
        success:false,error:e.message,
      });
    }
}

async function list(req, res) {
    try {
      const data = req.query;
      const query = buildListQuery(data);
      

      let events = await Event.findAll({ where: {...query} });
      if(events.length) {
        events = events.map(event=> ({
          id: event.id,
          name: event.name,
          date: (new Date(event.date)).toDateString(),
          availableAttendeesCount: event.attendees_count,
          description: event.description,
          category: event.category,
        }))
  
        res.status(200).json({success: true, data: {events}})
      } else {
        res.status(404).json({success:true,data:{events:[]}});
      }
      

    } catch(e){
      res.status(500).json({
        success:false,errors:[{
          message:e.message
        }]
      });
    }
  }

function buildListQuery({name, start_date , end_date, category}) {
  let query = {};

  if(name) {
    query['name'] = {[Op.eq]:name};
  }

  if(start_date && end_date) {
    query['date'] = {
      [Op.between]: [start_date, end_date]
    }
  }
  else if(start_date || end_date) {
    if(start_date) {
      query['date'] = {
        [Op.eq]: start_date
      }
    }
  
    if(end_date) {
      query['date'] = {
        [Op.eq]: end_date 
      }
    }
  } 

  if(category) {
    query['category'] = {
      [Op.eq]: category
    }
  }

  return query;
}

module.exports = {
    create,
    list
}