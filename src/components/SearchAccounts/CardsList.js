// CardsList.js

import React, { useEffect, useState } from 'react';
import AccountCard from './AccountCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useAxios from '../Auth/useAxiosHook.interceptor';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useLocation } from 'react-router-dom';

function CardsList({ isSmallScreen, filters }) {
    const [profiles, setProfiles] = useState();
    const [loading, setLoading] = useState(true);
    const axios = useAxios();
    const location = useLocation();

    useEffect(() => {
        let endpoint = "";
        if (window.location.pathname === "/talents/profiles/list") {
            endpoint = "profiles/talents";
        } else if (window.location.pathname === "/scouts/profiles/list") {
            endpoint = "profiles/scout";
        } else if (window.location.pathname === "/clubs/profiles/list") {
            endpoint = "profiles/clubs";
        } else if (window.location.pathname === "/coaches/profiles/list") {
            endpoint = "profiles/coaches";
        } else {
            endpoint = "profiles/default";
        }

        axios
            .post(endpoint, filters) // Include filters in the request
            .then((response) => {
                setProfiles(response.data.result);
                console.log('aya', response.data.result);

                console.log('Filters:', filters);
            })
            .catch((error) => {
                console.error("Error fetching profiles data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location.pathname, filters]); // Include filters in the dependency array

    const numColumns = 4;

    if (loading) {
        return (<LoadingScreen />);
    }

    return (
        <Container>
            {profiles?.length === 0 ? (
                <div className="no-profiles-message">There are no profiles yet.</div>
            ) : (
                profiles?.map((profile, index) => (
                    (index % numColumns === 0 || index === profiles?.length - 1) && (
                        <Row key={index} style={{ marginLeft: isSmallScreen ? '3rem' : '' }}>
                            {profiles?.slice(index, index + numColumns).map((profile, i) => (
                                <Col key={i} md={3}>
                                    <AccountCard profile={profile} />
                                </Col>
                            ))}
                        </Row>
                    )
                ))
            )}
        </Container>
    );
}

export default CardsList;
