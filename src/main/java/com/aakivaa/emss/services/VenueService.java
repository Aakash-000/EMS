package com.aakivaa.emss.services;


import com.aakivaa.emss.dto.EventDto;
import com.aakivaa.emss.dto.VenueDto;
import com.aakivaa.emss.models.Booking;
import com.aakivaa.emss.models.EventsCostRate;

import java.util.List;

public interface VenueService {
    List<VenueDto> findAll();

    VenueDto findById(Integer id);

    VenueDto findVenueByEmail(String email);

    void deleteBYId(Integer integer);

    Integer update(VenueDto venueDto , String email);

    List<Booking> getRequestedBooking(String email);

    List<VenueDto> getAllVerifiedVenue();

    List<Booking> getBookingList(String email);

    List<?> getAllBookedDate(String email);

    EventsCostRate uploadEventDetails(EventDto eventDto, String email);

    Integer getNumberOfNewRegistration();

    Integer getNumberOfBooking(String email);
}
